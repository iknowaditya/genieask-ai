import React, { useState } from "react";
import { Wand2, Sparkles, Sun, Moon, Menu, User, LogOut } from "lucide-react";
import { Session } from "next-auth";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// components/editor/EditorHeader.tsx
interface EditorHeaderProps {
  theme: "dark" | "light";
  activeTheme: any;
  selectedModel: string;
  setTheme: (theme: "dark" | "light") => void;
  setSelectedModel: (model: string) => void;
  user: Session["user"] | null | undefined; // Update this line
  onSignOut: () => Promise<void>;
  models: Array<{
    id: string;
    name: string;
    speed: string;
    icon: any;
  }>;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  theme,
  activeTheme,
  selectedModel,
  setTheme,
  setSelectedModel,
  models,
  user,
  onSignOut,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-8">
      <div className="flex items-center gap-6 w-full sm:w-auto justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Wand2 className={`w-7 h-7 text-violet-500 animate-pulse`} />
            <Sparkles className="w-4 h-4 text-fuchsia-500 absolute -top-1 -right-1" />
          </div>
          <h1
            className={`text-2xl sm:text-4xl font-bold bg-gradient-to-r ${activeTheme.accent} bg-clip-text text-transparent`}
          >
            GenieAsk
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {user && (
            <div className="hidden md:block ">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.email || ""}
                      />
                      <AvatarFallback>
                        {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onSignOut}
                    className="text-red-500"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className={`p-2 rounded-xl hover:bg-violet-500/10 cursor-pointer ${activeTheme.text}`}
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-amber-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-violet-600" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>Toggle theme</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Mobile Menu Button */}
          <div className="block sm:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className={`p-2 rounded-xl hover:bg-violet-500/10 ${activeTheme.text}`}
                >
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className={`${activeTheme.card} border-none`}
              >
                <SheetHeader>
                  <SheetTitle className={`${activeTheme.text}`}>
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  {user && (
                    <div className="mb-4 p-4 rounded-lg bg-gray-800/50">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar>
                          <AvatarImage src={user.image || ""} />
                          <AvatarFallback>
                            {user.name?.charAt(0) ||
                              user.email?.charAt(0) ||
                              "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className={`${activeTheme.text} font-medium`}>
                            {user.email}
                          </p>
                          {user.name && (
                            <p className={`${activeTheme.textMuted} text-sm`}>
                              {user.name}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={onSignOut}
                      >
                        Sign Out
                      </Button>
                    </div>
                  )}
                  <div className="flex flex-col gap-2">
                    {models.map((model) => {
                      const Icon = model.icon;
                      return (
                        <button
                          key={model.id}
                          onClick={() => {
                            setSelectedModel(model.id);
                            setIsOpen(false);
                          }}
                          className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                            selectedModel === model.id
                              ? "bg-violet-500 text-white"
                              : `${activeTheme.text} hover:bg-violet-500/10`
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{model.name}</span>
                          <span className="ml-1 text-xs opacity-60">
                            {model.speed}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Desktop Tabs */}
      <div className="hidden sm:flex items-center gap-4">
        <Tabs
          value={selectedModel}
          onValueChange={setSelectedModel}
          className={`border rounded-xl p-1 ${activeTheme.tabBackground} bg-opacity-20 backdrop-blur-lg`}
        >
          <TabsList className="bg-transparent">
            {models.map((model) => {
              const Icon = model.icon;
              return (
                <TabsTrigger
                  key={model.id}
                  value={model.id}
                  className={`rounded-lg px-4 py-2 ${
                    selectedModel === model.id
                      ? "bg-violet-500 text-white"
                      : `${activeTheme.tabText} hover:bg-violet-500/10`
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4" />
                    <span>{model.name}</span>
                    <span className="ml-1 text-xs opacity-60">
                      {model.speed}
                    </span>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
