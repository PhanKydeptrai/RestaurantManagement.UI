import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdateCategory = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [categoryName, setCategoryName] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        // Fetch category data using categoryId and set initial state
        const fetchCategoryData = async () => {
            try {
                const response = await fetch(`/api/category/${categoryId}`);
                const data = await response.json();
                setCategoryName(data.categoryName);
                setImageUrl(data.imageUrl);
            } catch (error) {
                console.error('Error fetching category data:', error);
            }
        };

        fetchCategoryData();
    }, [categoryId]);

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
        formData.append('categoryName', categoryName);
        if (fileInputRef.current && fileInputRef.current.files) {
            formData.append('image', fileInputRef.current.files[0]);
        }

        try {
            const response = await fetch(`/api/category     /${categoryId}`, {
                method: 'PUT',
                body: formData,
            });
            if (response.ok) {
                console.log('Category updated successfully');
                // Optionally, redirect or show a success message
            } else {
                console.error('Error updating category');
            }
        } catch (error) {
            console.error('Error updating category:', error);
        }
    };

    return (
        <>
            <main className="container">
                <div className="row d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Update Category</h1>
                </div>
                <div className="row" key={categoryId}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="categoryName" className="form-label">Category Name:</label>
                            <input
                                type="text"
                                id="categoryName"
                                className="form-control"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="fileInput" className="form-label">Upload Image:</label>
                            <input
                                type="file"
                                id="fileInput"
                                className="form-control"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                            />
                        </div>
                        {imageUrl && (
                            <div className="mb-3">
                                <img src={imageUrl} alt="Selected" className="img-thumbnail" />
                            </div>
                        )}
                        <button type="submit" className="btn btn-primary">Update Category</button>
                    </form>
                </div>
            </main>
        </>
    );
};

export default UpdateCategory;