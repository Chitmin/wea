import { clsx, type ClassValue } from "clsx";
import AES from "crypto-js/aes";
import Utf8 from "crypto-js/enc-utf8";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function encrypt(plain: string, secret: string) {
  return AES.encrypt(plain, secret).toString();
}

export function decrypt(cipher: string, secret: string) {
  const bytes = AES.decrypt(cipher, secret);

  return bytes.toString(Utf8);
}
