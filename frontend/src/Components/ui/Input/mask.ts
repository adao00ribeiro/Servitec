export function cep(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 9;
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{5})(\d)/, "$1-$2");
    e.currentTarget.value = value;
    return e;
}

export function currency(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d)(\d{2})$/, "$1,$2");
    value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

    e.currentTarget.value = value;
    return e;
}

export function cpf(e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 14;
    let value = e.currentTarget.value;
    if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
        value = value.replace(/\D/g, "");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{2})$/, "$1-$2");
        e.currentTarget.value = value;
    }
    return e;
}

export function cnpj(e: React.FormEvent<HTMLInputElement>) {
    let value = e.currentTarget.value;
    // Remove todos os caracteres não numéricos
    value = value.replace(/\D/g, "");
    // Aplica a formatação do CNPJ (XX.XXX.XXX/YYYY-ZZ)
    value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, "$1.$2.$3/$4-$5");
    e.currentTarget.value = value;
    return e;
}
