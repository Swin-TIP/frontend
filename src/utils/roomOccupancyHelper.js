export const getUnoccupiedRooms = (roomsList, startTime, duration) => {
    const endTime = startTime + (duration * 60000); // in milliseconds
    const freeRoomsList = roomsList.filter(room => {
        // Not occupied the whole day
        if (room.occupied.length === 0) {
            return true;
        } else {
            let result = false;
            // Check startTime of each occupied room against endTime of created session
            // Check endTime of each occupied room against startTime of created session
            room.occupied.forEach(occupiedRoom => {
                result = occupiedRoom.start_at >= endTime || occupiedRoom.end_at <= startTime;
            });
            return result;
        }
    });
    return freeRoomsList;
};