const getCardUnicode = (value, suit) => {
    const suitMap = {   //Mappings for values of suits to the unicode value
        '♠': 'A', // Spades
        '♥': 'B', // Hearts
        '♦': 'C', // Diamonds
        '♣': 'D'  // Clubs
    };

    const valueMap = {  //Mappings for values of cards to the unicode value
        'A': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9',
        '10': 'A',
        'J': 'B',
        'Q': 'D',
        'K': 'E'
    };

    const suitCode = suitMap[suit]; // Get suit code
    const valueCode = valueMap[value]; // Get value code

    return `\\u{1F0${suitCode}${valueCode}}`;
};

export default getCardUnicode;