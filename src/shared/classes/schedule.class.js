/**
 * @class Представляє елемент розкладу.
 * @param {Object} data - Дані для елемента розкладу.
 * @param {string} data.d - Дата заняття у форматі РРРР-ММ-ДД.
 * @param {number} data.li - Номер пари.
 * @param {string} data.ld - (Необов'язково) День тижня (можна ігнорувати).
 * @param {string} data.le - Кінець пари.
 * @param {string} data.ls - Початок пари.
 * @param {string} data.vr - Номер аудиторії та адреса корпусу.
 * @param {string} data.t - Ім'я викладача.
 * @param {string} data.l - Назва пари.
 * @param {string} data.lt - Тип пари.
 * @param {string} data.g - Список груп, які можуть відвідувати пару.
 * @param {string} data.link - Посилання на онлайн пару.
 */
export class ISchedule {
    constructor(data) {
        this.d = data.d;
        this.li = data.li;
        this.ld = data.ld;
        this.le = data.le;
        this.ls = data.ls;
        this.vr = data.vr;
        this.t = data.t;
        this.l = data.l;
        this.lt = data.lt;
        this.g = data.g;
        this.link = data.link;
    }
}
