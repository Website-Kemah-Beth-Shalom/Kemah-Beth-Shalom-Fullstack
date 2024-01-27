import React from "react";


const Rupiah = (money: number) => {
    const reverse = money.toString().split('').reverse().join('');
    const ribuan = reverse.match(/\d{1,3}/g);
    const rupiah = ribuan?.join('.').split('').reverse().join('');
    return `Rp${ribuan?.join('.').split('').reverse().join('')}`
}


export { Rupiah }
