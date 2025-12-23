"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";

export function GenerateKeyDialog() {
  const [open, setOpen] = useState(false);
  const [keyName, setKeyName] = useState("");
  const [generateSecret, setGenerateSecret] = useState(false);

  const handleGenerate = () => {
    if (!keyName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a key name",
        variant: "destructive",
      });
      return;
    }

    // Simulate key generation
    const newKey = {
      name: keyName,
      key: `EXAMPLE${Math.random()
        .toString(36)
        .substring(2, 15)
        .toUpperCase()}`,
      secret: generateSecret
        ? `EXAMPLE+${Math.random().toString(36).substring(2, 30)}`
        : undefined,
      created: "Just now",
    };

    toast({
      title: "Key generated successfully",
      description: `API key "${keyName}" has been created`,
    });

    // Reset form and close dialog
    setKeyName("");
    setGenerateSecret(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="size-4" />
          Generate New Key
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Generate New Access Key</DialogTitle>
          <DialogDescription>
            Create a new API key to access the Spaces API. You can optionally
            generate a secret for additional security.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="key-name">Key Name</Label>
            <Input
              id="key-name"
              placeholder="my-api-key"
              value={keyName}
              onChange={(e) => setKeyName(e.target.value)}
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              Choose a descriptive name to help you identify this key later
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox
              id="generate-secret"
              checked={generateSecret}
              onCheckedChange={(checked) => setGenerateSecret(checked === true)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="generate-secret"
                className="text-sm font-normal cursor-pointer"
              >
                Generate secret key
              </Label>
              <p className="text-xs text-muted-foreground">
                A secret key provides an additional layer of security for your
                API access
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleGenerate}>Generate Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
