/**
* Templates
*/

Template.auctionItems.auctionItems = function () {
  console.log(AuctionItems.find());
  return AuctionItems.find();
}

Template.auctionItems.events = {
  'click .bid-btn': function (e) {
    e.preventDefault();
  },
  'click .delete-auction': function (e) {
    event.preventDefault();
    event.stopPropagation();
    
    var bidID = e.currentTarget.parentElement.getAttribute('data-bid-id');
    AuctionItems.remove(bidID);
  }
}

Template.createAuctionItem.events = {
  'submit form': function(e) {   // also tried just 'submit', both work for me!
    event.preventDefault();
    event.stopPropagation();

    var form={};
    
    if( !AuctionItems.findOne( { itemName: document.forms["add-auction"]["itemName"].value } ) ) {
      for(var i = 0; i < document.forms["add-auction"].length; i++) {
       var prop = document.forms["add-auction"][i];
        if ( prop.name == "startTime" ) 
          form['startDate'] = new Date( form['startDate'] + " " + prop.value);
        else if ( prop.name == "plannedStopTime" ) 
          form['plannedCloseDate'] = new Date( form['plannedCloseDate'] + " " + prop.value);
        else
          form[prop.name] = document.forms["add-auction"][i].value;
      }
    
      AuctionItems.insert(form);
      return false;     
    }
    throw('Item ya existe');
  }
}

