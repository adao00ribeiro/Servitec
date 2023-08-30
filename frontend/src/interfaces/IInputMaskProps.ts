import { InputHTMLAttributes, ReactNode } from "react";

export interface IInputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
    mask: "cep" | "currency" | "cpf" | "cnpj";
}