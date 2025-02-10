"use client";

import React, { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Sparkles, XCircle } from "lucide-react";
import { EditorHeader } from "./EditorHeader";
import { PresetSidebar } from "./PresetSidebar";
import { TextEditor } from "./TextEditor";
import { SettingsPanel } from "./SettingsPanel";
import { ResponseHistory } from "./ResponseHistory";
import { models, presets, themeColors } from "./editorConfig";
import { EditorSkeleton } from "./EditorSkeleton";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

export const EnhancedEditor = () => {
  // State declarations
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState("groq");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [error, setError] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState("creative");
  const [temperature, setTemperature] = useState(0.7);
  const [autoSave, setAutoSave] = useState(false);
  const [aiResponses, setAiResponses] = useState<string[]>([]);

  // Hooks
  const router = useRouter();
  const { data: session, status } = useSession();
  const activeTheme = themeColors[theme];

  // Auth check effect
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  // Sign out handler
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/auth");
      toast.success("Successfully signed out", {
        icon: "👋",
        duration: 3000,
      });
    } catch (error) {
      toast.error("Error signing out" + error, {
        icon: "❌",
      });
    }
  };

  // Auto-save effect
  useEffect(() => {
    if (autoSave && text && session?.user) {
      const savedData = {
        text,
        aiResponses,
        timestamp: new Date().toISOString(),
        model: selectedModel,
        preset: activePreset,
        userId: session.user.id,
      };
      localStorage.setItem("magicSpellData", JSON.stringify(savedData));
      toast.success("Content auto-saved", {
        icon: "💾",
      });
    }
  }, [text, autoSave, selectedModel, activePreset, aiResponses, session]);

  // Load saved data effect
  useEffect(() => {
    if (session?.user) {
      const savedData = localStorage.getItem("magicSpellData");
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          if (parsed.userId === session.user.id) {
            setText(parsed.text);
            setAiResponses(parsed.aiResponses || []);
            setSelectedModel(parsed.model);
            setActivePreset(parsed.preset);
          }
        } catch (error) {
          toast.error("Error loading saved data" + error, {
            icon: "❌",
          });
        }
      }
    }
  }, [session]);

  // Response handlers
  const handleDeleteResponse = (index: number) => {
    setAiResponses((prev) => prev.filter((_, i) => i !== index));
    toast.success("Response deleted", {
      icon: "🗑️",
    });
  };

  const handleResetAll = () => {
    setAiResponses([]);
    setText("");
    setError(null);
    setActivePreset("creative");
    setTemperature(0.7);
    toast.success("All content has been reset", {
      icon: "🔄",
    });
  };

  // Share handler
  const handleShare = async (type: "copy" | "pdf" | "twitter") => {
    const content = `${text}\n\n${aiResponses.join("\n\n")}`;

    switch (type) {
      case "copy":
        try {
          await navigator.clipboard.writeText(content);
          toast.success("Content copied to clipboard", {
            icon: "📋",
          });
        } catch (error) {
          toast.error("Failed to copy content" + error, {
            icon: "❌",
          });
        }
        break;
      case "pdf":
        try {
          const printWindow = window.open("", "", "width=800,height=600");
          if (printWindow) {
            printWindow.document.write(`
              <html>
                <head>
                  <title>GenieAsk - Generated Content</title>
                  <style>
                    body { 
                      font-family: 'JetBrains Mono', monospace; 
                      padding: 20px;
                      line-height: 1.6;
                    }
                    .content {
                      margin-bottom: 30px;
                      white-space: pre-wrap;
                    }
                    .ai-response { 
                      margin-top: 20px; 
                      padding: 15px;
                      background: #f5f5f5;
                      border-radius: 8px;
                      white-space: pre-wrap;
                    }
                  </style>
                </head>
                <body>
                  <h2>Your Content</h2>
                  <div class="content">${text}</div>
                  <h2>AI Responses</h2>
                  ${aiResponses
                    .map(
                      (response) => `
                    <div class="ai-response">${response}</div>
                  `
                    )
                    .join("")}
                </body>
              </html>
            `);
            printWindow.document.close();
            printWindow.print();
            toast.success("PDF generated", {
              icon: "📄",
            });
          }
        } catch (error) {
          toast.error("Failed to generate PDF" + error, {
            icon: "❌",
          });
        }
        break;
      case "twitter":
        try {
          const tweetText = encodeURIComponent(content.slice(0, 280));
          window.open(
            `https://twitter.com/intent/tweet?text=${tweetText}`,
            "_blank"
          );
          toast.success("Opening Twitter...", {
            icon: "🐦",
          });
        } catch (error) {
          toast.error("Failed to share on Twitter" + error, {
            icon: "❌",
          });
        }
        break;
    }
  };

  // Text generation handler
  const generateText = async () => {
    if (!session?.user) {
      toast.error("Please sign in to generate text");
      return;
    }

    setIsGenerating(true);
    setError(null);

    const generatePromise = fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: selectedModel,
        prompt:
          text ||
          `${presets.find((p) => p.id === activePreset)?.prompt || ""} magic`,
        temperature: temperature,
      }),
    });

    toast.promise(
      generatePromise,
      {
        loading: "Generating...",
        success: "Content generated successfully! ✨",
        error: "Failed to generate content 😔",
      },
      {
        style: {
          background: theme === "dark" ? "#1F2937" : "#FFFFFF",
          color: theme === "dark" ? "#FFFFFF" : "#1F2937",
        },
      }
    );

    try {
      const response = await generatePromise;
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate text");
      }

      const data = await response.json();
      if (data.content) {
        const newResponse = data.content;
        setAiResponses((prev) => [...prev, newResponse]);
        setText((prevText) =>
          prevText ? `${prevText}\n\n${newResponse}` : newResponse
        );
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Generation error:", error);
      if (error instanceof Error) {
        setError(error.message || "Failed to generate text. Please try again.");
      } else {
        setError("Failed to generate text. Please try again.");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  if (status === "loading") {
    return <EditorSkeleton />;
  }

  return (
    <div
      className={`min-h-screen ${activeTheme.background} p-8 transition-all duration-500`}
    >
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: theme === "dark" ? "#1F2937" : "#FFFFFF",
            color: theme === "dark" ? "#FFFFFF" : "#1F2937",
            border: "1px solid",
            borderColor:
              theme === "dark"
                ? "rgba(75, 85, 99, 0.3)"
                : "rgba(229, 231, 235, 0.3)",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10B981",
              secondary: "white",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "white",
            },
          },
        }}
      />
      <div className="max-w-6xl mx-auto">
        <EditorHeader
          theme={theme}
          activeTheme={activeTheme}
          selectedModel={selectedModel}
          setTheme={setTheme}
          setSelectedModel={setSelectedModel}
          models={models}
          user={session?.user ?? null}
          onSignOut={handleSignOut}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <PresetSidebar
              activeTheme={activeTheme}
              activePreset={activePreset}
              setActivePreset={setActivePreset}
              setText={setText}
              presets={presets}
            />
          </div>

          <div className="lg:col-span-3">
            <TextEditor
              text={text}
              setText={setText}
              isGenerating={isGenerating}
              generateText={generateText}
              activeTheme={activeTheme}
              handleShare={handleShare}
              aiResponses={aiResponses}
            />

            <SettingsPanel
              activeTheme={activeTheme}
              temperature={temperature}
              setTemperature={setTemperature}
              autoSave={autoSave}
              setAutoSave={setAutoSave}
            />
          </div>
        </div>

        {isGenerating && (
          <Alert className="mt-6 bg-violet-500/10 border-violet-500/20 text-violet-400 rounded-2xl">
            <AlertDescription className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Magic is happening... Generating creative content for you!
            </AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert className="mt-6 bg-red-500/10 border-red-500/20 text-red-400 rounded-2xl">
            <AlertDescription className="flex items-center gap-2">
              <XCircle className="w-4 h-4" />
              {error}
            </AlertDescription>
          </Alert>
        )}

        {aiResponses.length > 0 && (
          <ResponseHistory
            responses={aiResponses}
            theme={theme}
            activeTheme={activeTheme}
            onDelete={handleDeleteResponse}
            onReset={handleResetAll}
          />
        )}
      </div>
    </div>
  );
};

export default EnhancedEditor;
