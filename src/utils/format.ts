export const formatCurrency = (value: number, currency: string) =>
    new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency,
    }).format(value);

export const formatDate = (isoDate: string) =>
    new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(isoDate));
