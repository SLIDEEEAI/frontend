export default function useTime() {
    
    function timeSince(timestamp :number) {
        const now = new Date();
        if (timestamp) {
            // Если timestamp в секундах, преобразовать его в миллисекунды
            if (timestamp.toString().length === 10) 
                timestamp *= 1000;
            
            const secondsPast =  (now.getTime() - timestamp) / 1000;
        
            if (secondsPast < 60) 
                return Math.floor(secondsPast) + ' секунд назад';
            if (secondsPast < 3600) 
                return Math.floor(secondsPast / 60) + ' минут назад';
            if (secondsPast <= 86400) 
                return Math.floor(secondsPast / 3600) + ' часов назад';
            if (secondsPast > 86400) 
                return Math.floor(secondsPast / 86400) + ' дней назад';
            if (secondsPast > 2592000) 
                return Math.floor(secondsPast / 2592000) + ' месяцев назад';
        }
    }

    return {
        timeSince
    }

}