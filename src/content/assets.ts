import manifest from "./assets.json";

const files = manifest as Record<string, string>;

/** CDN url for a recovered file (image or PDF) from the original duet.edu.pk uploads. */
export function asset(name: string): string | undefined {
  return files[name];
}

export const logo = files["duet_logo-300x227.png"] ?? "";
export const logoSquare = files["cropped-duet_logo-270x270.png"] ?? "";
export const campusBg = files["dawoodBG.jpg"] ?? "";
export const aboutImg = files["about.jpg"] ?? "";

export const sliderImages: { src: string; alt: string }[] = [
  { src: files["WhatsApp-Image-2024-02-06-at-2.50.12-AM.jpeg"] ?? "", alt: "Dawood University event" },
  { src: files["convo-123123.jpg"] ?? "", alt: "11th Convocation 2024" },
  { src: files["pic-pec-china.jpg"] ?? "", alt: "DUET delegation in China" },
  { src: files["grp-photo-china.jpg"] ?? "", alt: "Group photo, Jiangxi University visit" },
  { src: files["image1.jpg"] ?? "", alt: "Dawood University campus" },
  { src: files["image5.jpg"] ?? "", alt: "Dawood University students" },
  { src: files["ti3.jpeg"] ?? "", alt: "Vice Chancellor Prof. Dr. Samreen Hussain (TI)" },
  { src: files["governer-meeting-1.jpeg"] ?? "", alt: "Meeting at Sindh Governor's House" },
].filter((s) => s.src);
