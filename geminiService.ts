import { GoogleGenAI } from "@google/genai";

export async function generateInvitationMessage(params: {
  eventType: string;
  eventName: string;
  organizerName: string;
}) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
    
    let contextPrompt = "";
    if (params.eventType === 'tahlilan') {
      contextPrompt = "Gunakan nada yang sangat sopan, khidmat, dan penuh doa. Sertakan ungkapan duka cita atau rasa syukur atas doa yang dipanjatkan. Fokus pada permohonan doa untuk almarhum/almarhumah.";
    } else if (params.eventType === 'wedding') {
      contextPrompt = "Gunakan nada yang sangat romantis, puitis, dan bahagia. Fokus pada penyatuan dua hati dan rasa syukur kepada Tuhan.";
    } else {
      contextPrompt = "Gunakan nada yang ceria, hangat, dan bersahabat.";
    }

    const prompt = `
      Bertindaklah sebagai penulis undangan profesional dan sastrawan. 
      Buatkan teks undangan digital untuk acara ${params.eventType}.
      Nama Acara: ${params.eventName}
      Penyelenggara: ${params.organizerName}
      
      Konteks tambahan: ${contextPrompt}
      
      Struktur teks:
      1. Pembukaan (Salam hangat atau puitis)
      2. Inti pesan (Mengajak dengan penuh hormat dan menjelaskan maksud acara)
      3. Penutup (Harapan kehadiran dan doa restu)
      
      Aturan:
      - Gunakan Bahasa Indonesia yang sangat elegan, menyentuh hati, dan eksklusif. 
      - Maksimal 120 kata. 
      - Jangan gunakan format markdown (seperti ** atau #).
      - Langsung ke isi teks saja.
    `;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
    });

    return response.text?.trim() || "Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada momen berharga kami. Kehadiran Anda adalah kebahagiaan yang tak terhingga bagi kami.";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Kehadiran Anda adalah kehormatan bagi kami. Kami mengundang Anda untuk merayakan momen spesial ini bersama-sama dalam suasana yang penuh kehangatan dan kekeluargaan.";
  }
}