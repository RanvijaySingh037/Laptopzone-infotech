import React, { useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

const Add = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  // Track new uploads per slot
  const [imageFiles, setImageFiles] = useState([null, null, null, null]);
  const [previews, setPreviews] = useState(["", "", "", ""]);
  // Track existing URLs specifically to keep during edit
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [brand, setBrand] = useState("");
  const [series, setSeries] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("High Performance");
  const [sku, setSku] = useState("");
  const [condition, setCondition] = useState("New");
  
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [stock, setStock] = useState("");
  
  const [processor, setProcessor] = useState("");
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [storageType, setStorageType] = useState("SSD");
  const [display, setDisplay] = useState("");
  const [displaySize, setDisplaySize] = useState("");
  const [resolution, setResolution] = useState("");
  const [graphics, setGraphics] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [battery, setBattery] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [warranty, setWarranty] = useState("");
  
  const [featured, setFeatured] = useState(false);
  const [bestseller, setBestseller] = useState(false);
  const [trending, setTrending] = useState(false);
  
  const [ratingsAverage, setRatingsAverage] = useState(0);
  const [ratingsCount, setRatingsCount] = useState(0);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const fetchCategoriesAndBrands = async () => {
    try {
      const [catRes, brandRes] = await Promise.all([
        axios.get(backendUrl + '/api/category/list'),
        axios.get(backendUrl + '/api/brand/list')
      ]);

      if (catRes.data.success) {
        setCategories(catRes.data.categories);
      }
      if (brandRes.data.success) {
        setBrands(brandRes.data.brands);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories/brands");
    }
  }

  const fetchProductData = async () => {
    if (!isEdit) return;
    try {
      const response = await axios.post(backendUrl + '/api/product/single', { productId: id });
      if (response.data.success) {
        const p = response.data.product;
        setName(p.name);
        setSlug(p.slug);
        setBrand(p.brand?._id || p.brand);
        setSeries(p.series || "");
        setCategory(p.category?._id || p.category);
        setSubcategory(p.subCategory || "High Performance");
        setSku(p.sku || "");
        setCondition(p.condition || "New");
        setShortDescription(p.shortDescription || "");
        setDescription(p.description);
        setPrice(p.price);
        setOriginalPrice(p.originalPrice || "");
        setDiscountPercent(p.discountPercent || "");
        setStock(p.stock || 0);
        setProcessor(p.processor || "");
        setRam(p.ram || "");
        setStorage(p.storage || "");
        setStorageType(p.storageType || "SSD");
        setDisplay(p.display || "");
        setDisplaySize(p.displaySize || "");
        setResolution(p.resolution || "");
        setGraphics(p.graphics || "");
        setOperatingSystem(p.operatingSystem || "");
        setBattery(p.battery || "");
        setWeight(p.weight || "");
        setColor(p.color || "");
        setWarranty(p.warranty || "");
        setFeatured(p.featured || false);
        setBestseller(p.bestseller || false);
        setTrending(p.trending || false);
        setRatingsAverage(p.ratingsAverage || 0);
        setRatingsCount(p.ratingsCount || 0);
        
        // Initialize existing images
        setExistingImages(p.image || []);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching product details");
    }
  }

  useEffect(() => {
    const init = async () => {
        await fetchCategoriesAndBrands();
        if (isEdit) await fetchProductData();
    };
    init();
  }, [id]);

  const handleNameChange = (e) => {
    const val = e.target.value;
    setName(val);
    if (!isEdit) {
       setSlug(val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
    }
  };

  const handleFileChange = async (index, file) => {
    if (!file) return;
    
    // Compression Options
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    };
    
    try {
        const compressedFile = await imageCompression(file, options);
        
        const newFiles = [...imageFiles];
        newFiles[index] = compressedFile;
        setImageFiles(newFiles);

        const newPreviews = [...previews];
        newPreviews[index] = URL.createObjectURL(compressedFile);
        setPreviews(newPreviews);
    } catch (error) {
        console.error("Compression bug:", error);
        toast.error("Failed to process image");
    }
  };

  const clearSlot = (index, isExisting = false) => {
    if (isExisting) {
        const updatedExist = existingImages.filter((_, i) => i !== index);
        setExistingImages(updatedExist);
    } else {
        const newFiles = [...imageFiles];
        newFiles[index] = null;
        setImageFiles(newFiles);

        const newPreviews = [...previews];
        newPreviews[index] = "";
        setPreviews(newPreviews);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      if (isEdit) {
          formData.append("id", id);
          formData.append("currentImages", JSON.stringify(existingImages));
      }
      
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("brand", brand);
      formData.append("series", series);
      formData.append("category", category);
      formData.append("subCategory", subcategory);
      formData.append("sku", sku);
      formData.append("condition", condition);
      formData.append("shortDescription", shortDescription);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("originalPrice", originalPrice ? Number(originalPrice) : "");
      formData.append("discountPercent", discountPercent ? Number(discountPercent) : "");
      formData.append("stock", Number(stock));
      formData.append("processor", processor);
      formData.append("ram", ram);
      formData.append("storage", storage);
      formData.append("storageType", storageType);
      formData.append("display", display);
      formData.append("displaySize", displaySize);
      formData.append("resolution", resolution);
      formData.append("graphics", graphics);
      formData.append("operatingSystem", operatingSystem);
      formData.append("battery", battery);
      formData.append("weight", weight);
      formData.append("color", color);
      formData.append("warranty", warranty);
      formData.append("featured", featured);
      formData.append("bestseller", bestseller);
      formData.append("trending", trending);
      formData.append("ratingsAverage", ratingsAverage);
      formData.append("ratingsCount", ratingsCount);

      // Append new files
      imageFiles.forEach((file, index) => {
          if (file) {
              formData.append(`image${index + 1}`, file);
          }
      });

      const endpoint = isEdit ? '/api/product/update' : '/api/product/add';
      const response = await axios.post(backendUrl + endpoint, formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        if (isEdit) {
            navigate('/list');
        } else {
            // Reset form
            setName(""); setSlug(""); setSeries(""); setSku("");
            setShortDescription(""); setDescription(""); setPrice(""); setOriginalPrice("");
            setDiscountPercent(""); setStock(""); setProcessor(""); setRam("");
            setStorage(""); setDisplay(""); setDisplaySize(""); setResolution("");
            setGraphics(""); setOperatingSystem(""); setBattery(""); setWeight("");
            setColor(""); setWarranty(""); 
            setImageFiles([null, null, null, null]);
            setPreviews(["", "", "", ""]);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-6 sm:gap-10 p-4 sm:p-8 bg-white shadow-2xl rounded-2xl max-w-6xl mx-auto mb-20 animate-fadeIn overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full border-b-2 border-slate-100 pb-6 gap-4">
        <div>
           <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">{isEdit ? 'Edit Product' : 'Add Product'}</h2>
           <p className="text-slate-400 font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mt-1 sm:mt-2 italic">Product ID: {id || 'System Generated'}</p>
        </div>
        <button disabled={loading} type="submit" className={`w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 ${loading ? 'bg-slate-400' : 'bg-gradient-to-r from-blue-700 to-indigo-800'} text-white font-black rounded-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 uppercase tracking-widest text-[10px] sm:text-xs`}>
          {loading ? 'Processing...' : (isEdit ? 'Save Changes' : 'Add Product')}
        </button>
      </div>
      
      {/* Media Management Section */}
      <div className="w-full">
         <div className='flex items-center gap-3 mb-8'>
            <div className='w-8 h-8 bg-blue-700 text-white rounded-lg flex items-center justify-center shadow-lg'>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <p className='text-sm font-black text-slate-800 uppercase tracking-widest'>Product Images</p>
         </div>

         {/* Existing Images (Edit Only) */}
         {isEdit && existingImages.length > 0 && (
             <div className="mb-8">
                 <p className='text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4'>Existing Assets</p>
                 <div className="flex gap-4 flex-wrap">
                    {existingImages.map((url, idx) => (
                        <div key={idx} className="relative group">
                            <div className="w-24 h-24 border-2 border-indigo-100 rounded-xl overflow-hidden shadow-sm">
                                <img src={url} alt={`Existing ${idx}`} className="w-full h-full object-cover" />
                            </div>
                            <button type="button" onClick={() => clearSlot(idx, true)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    ))}
                 </div>
             </div>
         )}

         <div className="flex gap-6 flex-wrap bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-200">
           {[...Array(4)].map((_, index) => {
             const preview = previews[index];
             return (
               <div key={index} className="relative group">
                 <label htmlFor={`image${index + 1}`} className="cursor-pointer">
                    <div className="w-32 h-32 bg-white object-cover border-2 border-dashed rounded-2xl group-hover:border-blue-500 transition-all shadow-md overflow-hidden flex items-center justify-center">
                        {preview ? (
                            <img className="w-full h-full object-contain p-2" src={preview} alt="Preview" />
                        ) : (
                            <div className='flex flex-col items-center gap-2'>
                                <img className="w-10 h-10 opacity-20" src={assets.upload_area} alt="Upload" />
                                <span className='text-[8px] font-black text-slate-300 uppercase tracking-tighter'>Slot {index + 1}</span>
                            </div>
                        )}
                    </div>
                    <input onChange={(e) => handleFileChange(index, e.target.files[0])} type="file" id={`image${index + 1}`} hidden />
                 </label>
                 
                 {preview && (
                    <button type="button" onClick={() => clearSlot(index)} className="absolute -top-3 -right-3 bg-slate-800 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-xl border-4 border-white hover:bg-red-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                 )}
                 
                 <div className="absolute inset-x-0 bottom-0 bg-blue-700 text-white text-[8px] font-black text-center py-1.5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity uppercase tracking-widest rounded-b-2xl">
                    {preview ? 'Change File' : 'Upload File'}
                 </div>
               </div>
             );
           })}
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
         
         {/* Architecture Specs */}
         <div className="space-y-10">
            <div className='flex items-center gap-3 mb-6'>
                <div className='w-8 h-8 bg-indigo-700 text-white rounded-lg flex items-center justify-center shadow-lg'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <p className='text-sm font-black text-slate-800 uppercase tracking-widest'>Core Specifications</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 bg-slate-50/50 p-4 sm:p-6 rounded-2xl border border-slate-100 italic">
                <div className="flex flex-col gap-1.5">
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Processor</p>
                    <input onChange={(e) => setProcessor(e.target.value)} value={processor} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-bold placeholder:text-slate-300" type="text" placeholder="e.g. Intel Core i9" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Memory (RAM)</p>
                        <input onChange={(e) => setRam(e.target.value)} value={ram} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-bold" type="text" placeholder="32GB DDR5" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Graphics (GPU)</p>
                        <input onChange={(e) => setGraphics(e.target.value)} value={graphics} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-bold" type="text" placeholder="RTX 4080" />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Storage Capacity</p>
                        <input onChange={(e) => setStorage(e.target.value)} value={storage} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all font-bold" type="text" placeholder="1TB" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Storage Type</p>
                        <select onChange={(e) => setStorageType(e.target.value)} value={storageType} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold">
                            <option value="SSD">NVMe SSD</option>
                            <option value="HDD">HDD SATA</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-3 pt-6'>
                <div className='w-8 h-8 bg-emerald-700 text-white rounded-lg flex items-center justify-center shadow-lg'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>
                </div>
                <p className='text-sm font-black text-slate-800 uppercase tracking-widest'>Pricing & Stock</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-emerald-50/30 p-4 sm:p-6 rounded-2xl border border-emerald-100">
                <div className="flex flex-col gap-1.5">
                    <p className="text-[9px] sm:text-[10px] font-black text-emerald-700 uppercase tracking-widest ml-1">Price (₹)</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className="w-full bg-white border border-emerald-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none font-black text-emerald-800" type="number" required />
                </div>
                <div className="flex flex-col gap-1.5">
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">MRP (₹)</p>
                    <input onChange={(e) => setOriginalPrice(e.target.value)} value={originalPrice} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold text-slate-500" type="number" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Stock Units</p>
                    <input onChange={(e) => setStock(e.target.value)} value={stock} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold" type="number" />
                </div>
                <div className="flex flex-col gap-1.5">
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Hardware SKU</p>
                    <input onChange={(e) => setSku(e.target.value)} value={sku} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold text-xs" type="text" placeholder="SKU CODE" />
                </div>
            </div>
         </div>

         {/* General & Display Specs */}
         <div className="space-y-10">
            <div className='flex items-center gap-3 mb-6'>
                <div className='w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-lg'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <p className='text-sm font-black text-slate-800 uppercase tracking-widest'>Product Information</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="flex flex-col gap-1.5">
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Product Name</p>
                    <input onChange={handleNameChange} value={name} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none font-black text-slate-800 uppercase tracking-tight" type="text" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Brand</p>
                        <select onChange={(e) => setBrand(e.target.value)} value={brand} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold">
                            <option value="">Select Manufacturer</option>
                            {brands.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Series</p>
                        <input onChange={(e) => setSeries(e.target.value)} value={series} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold" type="text" placeholder="Series" />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Category</p>
                        <select onChange={(e) => setCategory(e.target.value)} value={category} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold">
                            <option value="">Select Category</option>
                            {categories.map((item) => <option key={item._id} value={item._id}>{item.name}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Condition</p>
                        <select onChange={(e) => setCondition(e.target.value)} value={condition} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold">
                            <option value="New">New</option>
                            <option value="Refurbished">Refurbished</option>
                            <option value="Open Box">Open Box</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-3 pt-6'>
                <div className='w-8 h-8 bg-purple-700 text-white rounded-lg flex items-center justify-center shadow-lg'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <p className='text-sm font-black text-slate-800 uppercase tracking-widest'>Display Specifications</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 bg-purple-50/30 p-4 sm:p-6 rounded-2xl border border-purple-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Screen Size</p>
                        <input onChange={(e) => setDisplaySize(e.target.value)} value={displaySize} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold" type="text" placeholder="16.0-inch" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Resolution</p>
                        <input onChange={(e) => setResolution(e.target.value)} value={resolution} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold" type="text" placeholder="QHD+" />
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Features</p>
                    <input onChange={(e) => setDisplay(e.target.value)} value={display} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold" type="text" placeholder="240Hz, IPS" />
                </div>
            </div>
         </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t items-start">
         <div className="space-y-6">
            <p className='text-sm font-black text-slate-800 uppercase tracking-widest'>Product Description</p>
            <textarea onChange={(e) => setShortDescription(e.target.value)} value={shortDescription} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-blue-500 font-medium min-h-[80px]" placeholder="Short summary of the product..." />
            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-sm focus:ring-2 focus:ring-blue-500 font-medium min-h-[220px]" placeholder="Detailed product description..." required />
         </div>
         
         <div className="space-y-8">
            <p className='text-sm font-black text-slate-800 uppercase tracking-widest'>Physical & Support Details</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input onChange={(e) => setBattery(e.target.value)} value={battery} className="bg-white border rounded-xl px-4 py-3 text-sm font-bold" placeholder="Battery: 90Whr" />
                <input onChange={(e) => setWeight(e.target.value)} value={weight} className="bg-white border rounded-xl px-4 py-3 text-sm font-bold" placeholder="Weight: 2.1kg" />
                <input onChange={(e) => setOperatingSystem(e.target.value)} value={operatingSystem} className="bg-white border rounded-xl px-4 py-3 text-sm font-bold" placeholder="OS: Win 11" />
                <input onChange={(e) => setWarranty(e.target.value)} value={warranty} className="bg-white border rounded-xl px-4 py-3 text-sm font-bold" placeholder="Warranty: 1yr" />
            </div>
            
            <p className='text-sm font-black text-slate-800 uppercase tracking-widest pt-4'>Product Visibility</p>
            <div className="flex flex-col gap-4">
                <label className="flex items-center justify-between p-4 bg-blue-50/50 rounded-2xl border border-blue-100 cursor-pointer hover:bg-blue-100/50 transition-all">
                    <span className="text-xs font-black text-blue-800 uppercase tracking-widest">Featured Product</span>
                    <input onChange={() => setFeatured(prev => !prev)} checked={featured} type="checkbox" className="w-6 h-6 rounded-lg text-blue-700 focus:ring-blue-500" />
                </label>
                <label className="flex items-center justify-between p-4 bg-orange-50/50 rounded-2xl border border-orange-100 cursor-pointer hover:bg-orange-100/50 transition-all">
                    <span className="text-xs font-black text-orange-800 uppercase tracking-widest">Mark as Bestseller</span>
                    <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" className="w-6 h-6 rounded-lg text-orange-700 focus:ring-orange-500" />
                </label>
                <label className="flex items-center justify-between p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 cursor-pointer hover:bg-indigo-100/50 transition-all">
                    <span className="text-xs font-black text-indigo-800 uppercase tracking-widest">Trending Product</span>
                    <input onChange={() => setTrending(prev => !prev)} checked={trending} type="checkbox" className="w-6 h-6 rounded-lg text-indigo-700 focus:ring-indigo-500" />
                </label>
            </div>
         </div>
      </div>
    </form>
  )
}

export default Add;
