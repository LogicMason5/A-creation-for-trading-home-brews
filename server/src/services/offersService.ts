
import { Offer } from "../type";
// const getoffers = (): Omit<offer, 'ssn'>[] => {
//   return offerData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => 
//   ({ id,
//     name,
//     dateOfBirth,
//     gender,
//     occupation,
//     entries }));
// };


// const getById = (id: string): Offer => {

//     const offer: Offer = offerData.find(p => p.id === id) as Offer;
//     return offer;  
// };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addOffer = ( entry: Omit<Offer, "id"> ): Offer => {
  const newOffer = {
    id: "thisisanid",
    ...entry
  };
  console.log('fake posting to db ' + entry);
  return newOffer;
};

// const addEntryToId = (entry: Entry, id: string): Offer  => {
//   const newEntry: Entry = {...entry, id: "greatidbydb"};
//   const offer: offer = getById(id);
//   const updatedoffer = {...offer, entries: offer.entries?.concat(newEntry)};

//   return updatedoffer;
// };



export default {
  // getoffers,
  // getById,
  addOffer,
  // addEntryToId
};