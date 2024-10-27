import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { CategoryInfo } from "./createmeal";
import axios from "axios";

const UpdateMealPage = () => {

    const { mealId } = useParams<{ mealId: string }>();
    const [mealName, setMealName] = useState<string>('');
    const [price, setPrice] = useState<number>();
    const [description, setDescription] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [fileInputRef, setfileInputRef] = useState<HTMLInputElement | null>(null);
    const [categoryId, setCategoryId] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('');
    const [categoryInfo, setCategoryInfo] = useState<CategoryInfo[]>([]);

    useEffect(() => {
        const fetchMealData = async () => {
            try {
                const response = await fetch(`https://localhost:7057/api/meal/${mealId}`);
                const data = await response.json();
                console.log(data);
                setMealName(data.value.mealName);
                setPrice(data.value.price);
                setDescription(data.value.description);
                setImageUrl(data.value.imageUrl);
                setCategoryId(data.value.categoryId);
                console.log(mealName);
            } catch (error) {
                console.error('Error fetching meal data:', error);
            }
        }; fetchMealData();
    }, [mealId]);

    useEffect(() => {
        fetch('https://localhost:7057/api/category/category-info')
            .then(response => response.json())
            .then(data => setCategoryInfo(data.value))
            .catch(error => console.log(error))
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('mealName', mealName);
        formData.append('price', price?.toString() as string);
        formData.append('description', description);
        formData.append('categoryId', categoryId);
        formData.append('categoryName', categoryName);
        if (fileInputRef && fileInputRef.files) {
            formData.append('mealImage', fileInputRef.files[0]);
        }
        try {
            const response = await axios.putForm(`https://localhost:7057/api/meal/${mealId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            console.log('Meal updated successfully:', response.data);
        } catch (error) {
            console.error('Failed to update meal:', error);
        }
    }



    return (
        <>
            <main className="container">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Update Category</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="mealName" className="form-label">Meal Name</label>
                        <input type="text" className="form-control" id="mealName" value={mealName} onChange={(event) => setMealName(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" className="form-control" id="price" value={price} onChange={(event) => setPrice(Number(event.target.value))} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" value={description} onChange={(event) => setDescription(event.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select className="form-select" id="category" value={categoryId} onChange={(event) => {
                            const selectedCategory = categoryInfo.find(category => category.categoryId === event.target.value);
                            setCategoryId(event.target.value);
                            setCategoryName(selectedCategory ? selectedCategory.categoryName : '');
                        }}>
                            {categoryInfo.map(category => (
                                <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="imageUrl" className="form-label">Image</label>
                        <input type="file" className="form-control" id="imageUrl" ref={setfileInputRef} onChange={handleFileChange} />
                        <img src={imageUrl ?? undefined} alt="Meal" className="img-fluid mt-2" />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            </main>
        </>
    )
}

export default UpdateMealPage;