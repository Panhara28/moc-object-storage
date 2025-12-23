"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal, Copy, Eye, EyeOff, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  secret?: string;
  created: string;
}

const initialKeys: ApiKey[] = [
  {
    id: "1",
    name: "new-key-example",
    key: "EXAMPLEYU2DQRUTDKJ6A",
    secret: "EXAMPLE+xVrgKsCnAufnnAI0I9tlw6efhNh7AOC4zs0",
    created: "Just now",
  },
  {
    id: "2",
    name: "spaces-access-key-example",
    key: "EXAMPLE6XTPICXWBOY56",
    created: "9 months ago",
  },
];

export function ApiKeysTable() {
  const [keys, setKeys] = useState<ApiKey[]>(initialKeys);
  const [visibleSecrets, setVisibleSecrets] = useState<Set<string>>(new Set());

  const toggleSecretVisibility = (keyId: string) => {
    setVisibleSecrets((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleDelete = (keyId: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== keyId));
    toast({
      title: "Key deleted",
      description: "The API key has been deleted successfully",
    });
  };

  const handleEdit = (keyName: string) => {
    toast({
      title: "Edit key",
      description: `Editing ${keyName}...`,
    });
  };

  return (
    <div className="rounded-lg border bg-card shadow-sm">
      <TooltipProvider>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30%]">Name</TableHead>
              <TableHead className="w-[45%]">Key</TableHead>
              <TableHead className="w-[20%]">Created</TableHead>
              <TableHead className="w-[5%]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keys.map((apiKey) => (
              <TableRow key={apiKey.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">{apiKey.name}</span>
                    {apiKey.secret && (
                      <Badge variant="secondary" className="w-fit text-xs">
                        Secret
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <code className="text-xs text-muted-foreground font-mono">
                        {apiKey.key}
                      </code>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => copyToClipboard(apiKey.key, "Key")}
                          >
                            <Copy className="size-3.5" />
                            <span className="sr-only">Copy key</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy key</TooltipContent>
                      </Tooltip>
                    </div>
                    {apiKey.secret && (
                      <div className="flex items-center gap-2">
                        <code className="text-xs text-muted-foreground font-mono">
                          {visibleSecrets.has(apiKey.id)
                            ? apiKey.secret
                            : "••••••••••••••••••••••••••••••••"}
                        </code>
                        <div className="flex gap-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() =>
                                  toggleSecretVisibility(apiKey.id)
                                }
                              >
                                {visibleSecrets.has(apiKey.id) ? (
                                  <EyeOff className="size-3.5" />
                                ) : (
                                  <Eye className="size-3.5" />
                                )}
                                <span className="sr-only">
                                  {visibleSecrets.has(apiKey.id)
                                    ? "Hide"
                                    : "Show"}{" "}
                                  secret
                                </span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {visibleSecrets.has(apiKey.id) ? "Hide" : "Show"}{" "}
                              secret
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon-sm"
                                onClick={() =>
                                  copyToClipboard(apiKey.secret!, "Secret")
                                }
                              >
                                <Copy className="size-3.5" />
                                <span className="sr-only">Copy secret</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy secret</TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {apiKey.created}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="size-4" />
                        <span className="sr-only">More actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(apiKey.name)}>
                        <Edit2 className="mr-2 size-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => copyToClipboard(apiKey.key, "Key")}
                      >
                        <Copy className="mr-2 size-4" />
                        Copy Key
                      </DropdownMenuItem>
                      {apiKey.secret && (
                        <DropdownMenuItem
                          onClick={() =>
                            copyToClipboard(apiKey.secret!, "Secret")
                          }
                        >
                          <Copy className="mr-2 size-4" />
                          Copy Secret
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(apiKey.id)}
                      >
                        <Trash2 className="mr-2 size-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TooltipProvider>
    </div>
  );
}
