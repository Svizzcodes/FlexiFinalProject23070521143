import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { paletteAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Palette,
  RefreshCw,
  Save,
  LogOut,
  Copy,
  Lock,
  Unlock,
} from "lucide-react";
import chroma from "chroma-js";

interface SavedPalette {
  _id: string;
  name: string;
  colors: string[];
  createdAt: string;
}

interface ColorBox {
  hex: string;
  locked: boolean;
}

const Home = () => {
  const [colors, setColors] = useState<ColorBox[]>([]);
  const [paletteName, setPaletteName] = useState("");
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>([]);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  // Generate a harmonious color palette
  const generateHarmoniousPalette = () => {
    const base = chroma.random();
    return chroma
      .scale([
        base,
        base.set("hsl.h", "+60"),
        base.set("hsl.h", "+180"),
        base.set("hsl.h", "+300"),
      ])
      .mode("lab")
      .colors(5);
  };

  const generatePalette = () => {
    setColors((prevColors) => {
      if (prevColors.length === 0) {
        const newPalette = generateHarmoniousPalette();
        return newPalette.map((c) => ({ hex: c, locked: false }));
      } else {
        const updated = prevColors.map((color) =>
          color.locked ? color : { ...color, hex: chroma.random().hex() }
        );
        return updated;
      }
    });
  };

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast({
      title: "Copied!",
      description: `${hex} copied to clipboard.`,
    });
  };

  const toggleLock = (index: number) => {
    setColors((prev) =>
      prev.map((c, i) =>
        i === index ? { ...c, locked: !c.locked } : c
      )
    );
  };

  const savePalette = async () => {
    if (!paletteName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a palette name",
        variant: "destructive",
      });
      return;
    }

    try {
      await paletteAPI.create({
        name: paletteName,
        colors: colors.map((c) => c.hex),
      });
      toast({
        title: "Success",
        description: "Palette saved successfully",
      });
      setPaletteName("");
      fetchPalettes();
    } catch (error: any) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "Failed to save palette",
        variant: "destructive",
      });
    }
  };

  const fetchPalettes = async () => {
    try {
      const response = await paletteAPI.getUserPalettes();
      setSavedPalettes(response.data);
    } catch (error) {
      console.error("Failed to fetch palettes");
    }
  };

  const deletePalette = async (id: string) => {
    try {
      await paletteAPI.delete(id);
      toast({
        title: "Success",
        description: "Palette deleted",
      });
      fetchPalettes();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete palette",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    generatePalette();
    fetchPalettes();
  }, []);

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Palette className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Color Palette Generator</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.name}
            </span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Palette Generator */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate Palette</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* COLORS */}
            <div className="flex flex-wrap gap-6 justify-center">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`relative w-56 h-56 rounded-2xl shadow-2xl flex flex-col items-center justify-end p-4 transition-all ${
                    color.locked ? "ring-4 ring-green-500" : ""
                  }`}
                  style={{ backgroundColor: color.hex }}
                >
                  <span className="text-base font-mono text-white bg-black/50 px-3 py-1 rounded">
                    {color.hex}
                  </span>

                  {/* Copy Button */}
                  <button
                    onClick={() => copyToClipboard(color.hex)}
                    className="absolute top-3 right-3 bg-black/40 hover:bg-black/70 p-2 rounded-lg transition"
                    title="Copy HEX"
                  >
                    <Copy className="w-5 h-5 text-white" />
                  </button>

                  {/* Lock Button */}
                  <button
                    onClick={() => toggleLock(index)}
                    className="absolute top-3 left-3 bg-black/40 hover:bg-black/70 p-2 rounded-lg transition"
                    title={color.locked ? "Unlock" : "Lock"}
                  >
                    {color.locked ? (
                      <Lock className="w-5 h-5 text-white" />
                    ) : (
                      <Unlock className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={generatePalette} className="flex-1">
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate New
              </Button>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Palette name"
                value={paletteName}
                onChange={(e) => setPaletteName(e.target.value)}
              />
              <Button onClick={savePalette}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Saved Palettes */}
        <Card>
          <CardHeader>
            <CardTitle>Your Saved Palettes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {savedPalettes.map((palette) => (
                <div key={palette._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">{palette.name}</h3>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deletePalette(palette._id)}
                    >
                      Delete
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-16 h-16 rounded"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
