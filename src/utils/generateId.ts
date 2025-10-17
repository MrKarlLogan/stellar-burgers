const uniqueID = (length: number) => {
  const symbols = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
  const uniqueID = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    let symbol = symbols[randomIndex];
    if (isNaN(parseInt(symbol))) {
      const randomNumber = Math.ceil(Math.random() * 2);
      symbol = randomNumber === 1 ? symbol.toLowerCase() : symbol.toUpperCase();
    }
    uniqueID.push(symbol);
  }
  return uniqueID.join('');
};

export default uniqueID;
