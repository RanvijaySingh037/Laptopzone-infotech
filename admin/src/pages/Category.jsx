import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Category = ({ token }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(false)
  const [list, setList] = useState([])

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      image && formData.append("image", image)

      const response = await axios.post(backendUrl + '/api/category/add', formData, { headers: { token } })

      if (response.data.success) {
        toast.success(response.data.message)
        setName('')
        setDescription('')
        setImage(false)
        fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/category/list')
      if (response.data.success) {
        setList(response.data.categories)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeCategory = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/category/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        fetchList()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='flex flex-col gap-10'>
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 bg-white p-5 rounded-lg shadow-sm'>
        <p className='text-lg font-bold'>Add Category</p>
        <div className='w-full'>
          <p className='mb-2'>Category Name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] border rounded-md px-3 py-2' type="text" placeholder="e.g. Gaming Laptops" required />
        </div>
        <div className='w-full'>
          <p className='mb-2'>Description</p>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] border rounded-md px-3 py-2' placeholder="Write description here" />
        </div>
        <div>
          <p className='mb-2'>Upload Image (Optional)</p>
          <label htmlFor="image">
            <img className='w-20 cursor-pointer border-2 border-dashed p-2' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
          </label>
        </div>
        <button type="submit" className='w-28 py-2 mt-4 bg-black text-white rounded-md'>ADD</button>
      </form>

      <div className='bg-white p-5 rounded-lg shadow-sm'>
        <p className='text-lg font-bold mb-5'>Category List</p>
        <div className='flex flex-col gap-2'>
          <div className='hidden md:grid grid-cols-[1fr_3fr_2fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
            <b>Image</b>
            <b>Name</b>
            <b>Description</b>
            <b className='text-center'>Action</b>
          </div>

          {list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_2fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-12 h-12 object-cover' src={item.image || assets.upload_area} alt="" />
              <p>{item.name}</p>
              <p className='hidden md:block'>{item.description || "No description"}</p>
              <p onClick={() => removeCategory(item._id)} className='text-right md:text-center cursor-pointer text-lg font-bold text-red-500'>X</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Category
