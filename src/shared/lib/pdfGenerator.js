import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export class pdfGenerator {
  constructor(resumeData, selectedTemplate) {
    this.resumeData = resumeData;
    this.selectedTemplate = selectedTemplate;
    this.url = null;
  }
  async createPdf() {
    const [{ getTemplateComponent }, { pdf }] = await Promise.all([
      import("@/shared/utils/template"),
      import("@react-pdf/renderer"),
    ]);
    // if (!this.selectedTemplate || this.resumeData?.ResumeType) return;
    const TemplateComponent = await getTemplateComponent(
      this?.selectedTemplate || this.resumeData?.ResumeType
    );
    const blob = await pdf(<TemplateComponent data={this.resumeData} />).toBlob();
    const url = URL.createObjectURL(blob);
    this.url = url;
    return url;
  }
  async downloadPdf() {
    if (this.isGenerating) return;

    this.isGenerating = true;
    if (!this.url) {
      await this.createPdf();
    }

    const link = document.createElement("a");
    link.href = this.url;
    link.download = `${this.resumeData.name || "resume"}.pdf`;
    link.click();

    setTimeout(() => {
      this.cleanUp();
    }, 8000);
  }

  cleanUp() {
    if (this.url) {
      URL.revokeObjectURL(this.url);
      this.url = null;
    }
  }
}
