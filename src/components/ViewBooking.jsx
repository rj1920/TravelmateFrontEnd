import { useState } from "react"

const ViewBooking = () => {

    const [bookingData, setBookingData] = useState({
            "fromCity": "",
            "tourStartDate": "",
            "tourEndDate": "",
            "noOfGuests": 0,
            "guests": [
                  {
                      "guestFirstName":"MK",
                      "guestLastName":"MK",
                      "dob":"1990-09-10",
                      "gender":"female"
                  },
                  {
                      "guestFirstName":"MKK2",
                      "guestLastName":"MK",
                      "dob":"1990-09-10",
                      "gender":"female"
                  },
                  {
                      "guestFirstName":"MK3",
                      "guestLastName":"MK3",
                      "dob":"1990-09-10",
                      "gender":"female"
                  }
          
            ],
            "user": {
              "userId": 1
            },
            "bookedPackageDetails": {
              "pkgName": "All-Inclusive 3N Holiday123",
              "pkgType": "Couple",
              "destinationCity": "Goa12",
              "noOfNights": 3,
              "flightStatus": true,
              "dropStatus": true,
              "packageBaseRate": 5000,
              "bookingRoomRate": 9955
            },
            "hotel": {
              "hotelId": 1
            },
            "room": {
              "roomId": 1
            },
            "departureFlight": {
              "flightId": 1
            },
            "returnFlight": {
              "flightId": 2
            },
            "bookedActivities": [{
                "activity":{
              "activityId": "1"
                },
              "dayOfActivity":1,
              "bookingRateOfActivity":658
            },
            {
                "activity":{
              "activityId": "2"
                },
              "dayOfActivity":2,
              "bookingRateOfActivity":658
            }],
            "bookingStatus": 0
          })
}