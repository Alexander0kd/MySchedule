/**
 * @interface ISchedule Представляє елемент розкладу.
 * @param {string} d - Дата заняття у форматі РРРР-ММ-ДД.
 * @param {number} li - Номер пари.
 * @param {string} ld - (Необов'язково) День тижня (можна ігнорувати).
 * @param {string} le - Кінець пари.
 * @param {string} ls - Початок пари.
 * @param {string} vr - Номер аудиторії та адреса корпусу.
 * @param {string} t - Ім'я викладача.
 * @param {string} l - Назва пари.
 * @param {string} lt - Тип пари.
 * @param {string} g - Список груп, які можуть відвідувати пару.
 * @param {string} link - (Необов'язково) Посилання на онлайн пару.
 */
export interface ISchedule {
    d: string;
    li: number;
    ld: string;
    le: string;
    ls: string;
    vr: string;
    t: string;
    l: string;
    lt: string;
    g: string;
    link?: string;
}
