import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { paletteAPI } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Palette, RefreshCw, Save, LogOut } from 'lucide-react';

interface SavedPalette {
  _id: string;
  name: string;
  colors: string[];
  createdAt: string;
}

const Home = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [paletteName, setPaletteName] = useState('');
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>([]);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  };

  const generatePalette = () => {
    const newColors = Array.from({ length: 5 }, () => generateRandomColor());
    setColors(newColors);
  };

  const savePalette = async () => {
    if (!paletteName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a palette name',
        variant: 'destructive',
      });
      return;
    }

    try {
      await paletteAPI.create({ name: paletteName, colors });
      toast({
        title: 'Success',
        description: 'Palette saved successfully',
      });
      setPaletteName('');
      fetchPalettes();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to save palette',
        variant: 'destructive',
      });
    }
  };

  const fetchPalettes = async () => {
    try {
      const response = await paletteAPI.getUserPalettes();
      setSavedPalettes(response.data);
    } catch (error) {
      console.error('Failed to fetch palettes');
    }
  };

  const deletePalette = async (id: string) => {
    try {
      await paletteAPI.delete(id);
      toast({
        title: 'Success',
        description: 'Palette deleted',
      });
      fetchPalettes();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete palette',
        variant: 'destructive',
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
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Palette className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Color Palette Generator</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user?.name}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Generate Palette</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 justify-center">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="w-24 h-24 rounded-lg shadow-lg flex items-end justify-center pb-2"
                  style={{ backgroundColor: color }}
                >
                  <span className="text-xs font-mono text-white bg-black/50 px-2 py-1 rounded">
                    {color}
                  </span>
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
