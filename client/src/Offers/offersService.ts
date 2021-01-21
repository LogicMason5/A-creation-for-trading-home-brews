import axios from 'axios'
import { Offer } from '../type'

const baseUrl = 'http://localhost:3001/api/offers'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content: Omit<Offer, "id">) => {
  const response = await axios.post(baseUrl, content)
  return response.data
}

const update = async (id: string, newObject: Offer) => {

  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  return response.data
}

const getById = async (id: string) => {
  console.log('id in offerService bef req '+ id)
  const response = await axios.get(`${ baseUrl }/${id}`)
  return response.data
}

const offersService = { getAll, createNew, update, getById }

export default offersService