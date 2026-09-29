import { Card, CardContent } from "@/shared/components/ui/card";
import { PostmarkBadge } from "./postmarkBadge";
import { Download, Edit2, FileText, MoreVertical, Share2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { getTemplateByName } from "../services/templateMap";

const ResumeCard = ({
  resume,
  onPreview,
  onDownload,
  onEdit,
  onDelete,
  onShare,
  getTemplateDisplayName,
}) => (
  <Card
    className="group relative border rounded-none shadow-none transition-all duration-300 hover:-translate-y-1"
    style={{ backgroundColor: "#FFFFFF", borderColor: "#E4E2DC" }}
  >
    <PostmarkBadge status={resume.status} />
    <CardContent className="p-0">
      {/* Torn-edge letter strip */}
      <div
        className="h-2 w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #E4E2DC 0, #E4E2DC 4px, transparent 4px, transparent 8px)",
        }}
      />
      <div
        className="p-6 flex items-center justify-center h-40 relative overflow-hidden cursor-pointer"
        style={{ backgroundColor: "#F7F7F5" }}
        onClick={() => onPreview(resume)}
      >
        <FileText
          className="w-9 h-9 transition-colors"
          style={{ color: "#C9C7BF" }}
          strokeWidth={1.25}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#1C2333]/5">
          <span
            className="px-4 py-2 text-xs font-mono tracking-wide border"
            style={{ backgroundColor: "#FFFFFF", borderColor: "#1C2333", color: "#1C2333" }}
          >
            OPEN PREVIEW
          </span>
        </div>
      </div>

      <div className="px-5 py-4 border-t" style={{ borderColor: "#E4E2DC" }}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h2
              className="text-sm font-semibold truncate"
              style={{ color: "#1C2333" }}
              title={resume.name}
            >
              {resume.name || "Untitled Resume"}
            </h2>
            <p className="text-xs truncate mt-0.5" style={{ color: "#6B7280" }}>
              {getTemplateDisplayName(resume.ResumeType)}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 -mr-2 rounded-none"
                style={{ color: "#6B7280" }}
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-none">
              <DropdownMenuItem onClick={() => onDownload(resume)}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </DropdownMenuItem>
              {resume.status === "paid" &&
                ["premium", "elite"].includes(
                  getTemplateByName(resume?.ResumeType)?.tier?.toLowerCase()
                ) && (
                  <DropdownMenuItem onClick={() => onShare && onShare(resume)}>
                    <Share2 className="mr-2 h-4 w-4 text-indigo-600" />
                    Share Resume Link
                  </DropdownMenuItem>
                )}
              <DropdownMenuItem onClick={() => onEdit(resume?._id)}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Resume
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(resume._id)}
                className="text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div
          className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-wide"
          style={{ color: "#6B7280" }}
        >
          <span>REF · {(resume?._id || "0000").toString().slice(-6).toUpperCase()}</span>

          {resume?.status === "paid" &&
          ["premium", "elite"].includes(
            getTemplateByName(resume?.ResumeType)?.tier?.toLowerCase()
          ) ? (
            <button
              onClick={e => {
                e.stopPropagation();
                onShare?.(resume);
              }}
              className="inline-flex items-center gap-1 font-mono text-[10px] text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
              title="Share public link"
            >
              <Share2 className="w-3 h-3" />
              SHARE
            </button>
          ) : (
            <span>
              {new Date(resume?.updatedAt || resume?.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ResumeCard;
