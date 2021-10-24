import moment from 'moment';

export const currentDate = () =>{
    return moment().format("MM-DD-YYYY hh:mm a")
}