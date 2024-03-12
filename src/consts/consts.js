class Constants {
    static ListingType = {
      Student: 'Student',
      Cafe: 'Cafe',
    };
    static ListingStatus = {
        Active: 'Active',   //when a listing has been uploaded
        PendingCollection: 'PendingCollection', //when a listing has been reserved
        Collected: 'Collected', //when a listing has been collected and confirmed
        Expired: 'Expired', //when a listing has reached its use-before date
        CautionPast: 'CautionPast', //when a listing is past its best-before or sell-by date
      };
  
    // Add more constant enums as needed
  }
  
  export default Constants;
  