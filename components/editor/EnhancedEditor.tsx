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
import { Toast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export const EnhancedEditor = () => {
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState("groq");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [error, setError] = useState<string | null>(null);
  const [activePreset, setActivePreset] = useState("creative");
  const [temperature, setTemperature] = useState(0.7);
  const [autoSave, setAutoSave] = useState(false);
  const [aiResponses, setAiResponses] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const router = useRouter();
  const { data: session, status } = useSession();
  const activeTheme = themeColors[theme];

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/auth");
      showNotification("Successfully signed out");
    } catch (error) {
      showNotification("Error signing out" + error);
    }
  };

  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
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
      showNotification("Content auto-saved");
    }
  }, [text, autoSave, selectedModel, activePreset, aiResponses, session]);

  // Load saved data effect
  useEffect(() => {
    if (session?.user) {
      const savedData = localStorage.getItem("magicSpellData");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.userId === session.user.id) {
          setText(parsed.text);
          setAiResponses(parsed.aiResponses || []);
          setSelectedModel(parsed.model);
          setActivePreset(parsed.preset);
        }
      }
    }
  }, [session]);

  const handleDeleteResponse = (index: number) => {
    setAiResponses((prev) => prev.filter((_, i) => i !== index));
    showNotification("Response deleted");
  };

  const handleResetAll = () => {
    setAiResponses([]);
    setText("");
    setError(null);
    setActivePreset("creative");
    setTemperature(0.7);
    showNotification("All content has been reset");
  };

  const handleShare = async (type: "copy" | "pdf" | "twitter") => {
    const content = `${text}\n\n${aiResponses.join("\n\n")}`;

    switch (type) {
      case "copy":
        await navigator.clipboard.writeText(content);
        showNotification("Content copied to clipboard");
        break;
      case "pdf":
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
        }
        break;
      case "twitter":
        const tweetText = encodeURIComponent(content.slice(0, 280));
        window.open(
          `https://twitter.com/intent/tweet?text=${tweetText}`,
          "_blank"
        );
        break;
    }
  };

  const generateText = async () => {
    if (!session?.user) {
      showNotification("Please sign in to generate text");
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const response = await fetch("/api/generate", {
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
        showNotification("New content generated successfully");
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

        {/* Notifications */}
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

        {/* Response History */}
        {aiResponses.length > 0 && (
          <ResponseHistory
            responses={aiResponses}
            theme={theme}
            activeTheme={activeTheme}
            onDelete={handleDeleteResponse}
            onReset={handleResetAll}
          />
        )}

        {/* Toast Notification */}
        {showToast && <Toast message={toastMessage} type="success" />}
      </div>
    </div>
  );
};

export default EnhancedEditor;
