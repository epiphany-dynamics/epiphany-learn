"use client";

import { useRef, useCallback } from "react";

interface Props {
  userName: string;
  completionDate: string; // ISO string or formatted date
  totalXP: number;
}

export default function Certificate({ userName, completionDate, totalXP }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCertificate = useCallback((canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 1200;
    const H = 850;
    canvas.width = W;
    canvas.height = H;

    // Background
    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(0, 0, W, H);

    // Border
    ctx.strokeStyle = "rgba(255, 166, 2, 0.3)";
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, W - 60, H - 60);

    // Inner border
    ctx.strokeStyle = "rgba(255, 166, 2, 0.1)";
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, W - 80, H - 80);

    // Corner accents
    ctx.strokeStyle = "#FFA602";
    ctx.lineWidth = 2;
    // Top-left
    ctx.beginPath(); ctx.moveTo(30, 60); ctx.lineTo(30, 30); ctx.lineTo(60, 30); ctx.stroke();
    // Top-right
    ctx.beginPath(); ctx.moveTo(W - 60, 30); ctx.lineTo(W - 30, 30); ctx.lineTo(W - 30, 60); ctx.stroke();
    // Bottom-left
    ctx.beginPath(); ctx.moveTo(30, H - 60); ctx.lineTo(30, H - 30); ctx.lineTo(60, H - 30); ctx.stroke();
    // Bottom-right
    ctx.beginPath(); ctx.moveTo(W - 60, H - 30); ctx.lineTo(W - 30, H - 30); ctx.lineTo(W - 30, H - 60); ctx.stroke();

    // "Certificate of Completion" label
    ctx.fillStyle = "rgba(255, 166, 2, 0.6)";
    ctx.font = "600 14px Montserrat, sans-serif";
    ctx.textAlign = "center";
    ctx.letterSpacing = "4px";
    ctx.fillText("CERTIFICATE OF COMPLETION", W / 2, 110);

    // Trophy emoji area
    ctx.font = "64px serif";
    ctx.fillText("🎓", W / 2, 190);

    // "AI Literate" title
    ctx.fillStyle = "#F0EFEB";
    ctx.font = "800 48px Montserrat, sans-serif";
    ctx.fillText("AI Literate", W / 2, 260);

    // Divider line
    ctx.strokeStyle = "rgba(255, 166, 2, 0.25)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 150, 285);
    ctx.lineTo(W / 2 + 150, 285);
    ctx.stroke();

    // "This certifies that"
    ctx.fillStyle = "rgba(240, 239, 235, 0.5)";
    ctx.font = "400 16px Montserrat, sans-serif";
    ctx.fillText("This certifies that", W / 2, 330);

    // User name
    ctx.fillStyle = "#00C9B7";
    ctx.font = "700 36px Montserrat, sans-serif";
    ctx.fillText(userName || "Learner", W / 2, 380);

    // Completion text
    ctx.fillStyle = "rgba(240, 239, 235, 0.6)";
    ctx.font = "400 16px Montserrat, sans-serif";
    ctx.fillText("has successfully completed all 7 modules of", W / 2, 430);

    // Course name
    ctx.fillStyle = "#F0EFEB";
    ctx.font = "600 22px Montserrat, sans-serif";
    ctx.fillText("Epiphany Learn — AI for Everyone", W / 2, 470);

    // Course description
    ctx.fillStyle = "rgba(240, 239, 235, 0.4)";
    ctx.font = "400 14px Montserrat, sans-serif";
    ctx.fillText("Demonstrating literacy in AI fundamentals, practical usage, safety,", W / 2, 510);
    ctx.fillText("critical evaluation, and responsible implementation of AI tools.", W / 2, 530);

    // Stats row
    const statsY = 590;
    ctx.fillStyle = "rgba(255, 166, 2, 0.15)";

    // XP stat
    ctx.fillStyle = "#FFA602";
    ctx.font = "700 28px Montserrat, sans-serif";
    ctx.fillText(`${totalXP.toLocaleString()}`, W / 2 - 200, statsY);
    ctx.fillStyle = "rgba(240, 239, 235, 0.4)";
    ctx.font = "400 12px Montserrat, sans-serif";
    ctx.fillText("XP EARNED", W / 2 - 200, statsY + 20);

    // Modules stat
    ctx.fillStyle = "#26890C";
    ctx.font = "700 28px Montserrat, sans-serif";
    ctx.fillText("7/7", W / 2, statsY);
    ctx.fillStyle = "rgba(240, 239, 235, 0.4)";
    ctx.font = "400 12px Montserrat, sans-serif";
    ctx.fillText("MODULES", W / 2, statsY + 20);

    // Date stat
    const formattedDate = new Date(completionDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    ctx.fillStyle = "#1368CE";
    ctx.font = "700 18px Montserrat, sans-serif";
    ctx.fillText(formattedDate, W / 2 + 200, statsY);
    ctx.fillStyle = "rgba(240, 239, 235, 0.4)";
    ctx.font = "400 12px Montserrat, sans-serif";
    ctx.fillText("COMPLETED", W / 2 + 200, statsY + 20);

    // Bottom divider
    ctx.strokeStyle = "rgba(255, 166, 2, 0.15)";
    ctx.beginPath();
    ctx.moveTo(100, 660);
    ctx.lineTo(W - 100, 660);
    ctx.stroke();

    // Branding
    ctx.fillStyle = "rgba(240, 239, 235, 0.3)";
    ctx.font = "500 14px Montserrat, sans-serif";
    ctx.fillText("Epiphany Dynamics — Work, Reimagined.", W / 2, 710);

    ctx.fillStyle = "rgba(240, 239, 235, 0.15)";
    ctx.font = "400 12px Montserrat, sans-serif";
    ctx.fillText("epiphanydynamics.ai", W / 2, 735);

    // Verification text
    ctx.fillStyle = "rgba(240, 239, 235, 0.1)";
    ctx.font = "400 10px Montserrat, sans-serif";
    ctx.fillText("This certificate was generated by Epiphany Learn — a free AI education platform by Epiphany Dynamics", W / 2, 790);
  }, [userName, completionDate, totalXP]);

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawCertificate(canvas);
    const link = document.createElement("a");
    link.download = `AI-Literate-Certificate-${userName.replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div>
      <canvas ref={canvasRef} className="hidden" />
      <button
        onClick={handleDownload}
        className="inline-flex items-center gap-2 font-semibold px-5 py-2.5 rounded-xl text-white transition-all hover:scale-105 active:scale-95"
        style={{ background: "linear-gradient(135deg, #FFA602, #EB670F)" }}
      >
        🏆 Download Certificate
      </button>
    </div>
  );
}
