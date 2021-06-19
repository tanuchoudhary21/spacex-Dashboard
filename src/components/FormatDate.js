// import React from 'react';
import moment from 'moment';

export default function FormatDate ({date}) {

    const getFormattedDate = (utcDate) => {
        return moment(utcDate).utc().format('DD MMMM YYYY HH:mm');
      };

    return (
        getFormattedDate(date)
    );
}


