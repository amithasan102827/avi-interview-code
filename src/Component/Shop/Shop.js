import React, { useEffect, useState } from "react";

export const Shop = () => {
    const [inventory, setInventory] = useState([]);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [matchProducts, setMatchProduct] = useState([]);

    useEffect(() => {
        fetch("https://fec-inventory-api.herokuapp.com/product-info")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        fetch(" https://fec-inventory-api.herokuapp.com/inventory-info")
            .then((res) => res.json())
            .then((data) => setInventory(data));
    }, []);

    const handleAddToCart = (meal) => {
        let newCart = [...cart, meal];
        // console.log(newCart);
        setCart(newCart);
        // console.log(newCart);
    };

    // const filterProducts = inventory.filter(pr => pr.product_id.includes(cart.id));

    // const res = inventory.filter((f) =>
    //     cart.find((item) => item.id === f.product_id)
    // );
    // console.log(res);
    let filtered = [];
    for(let arr in inventory){
        for(let filter in cart){
            if(inventory[arr].product_id == cart[filter].id ){
               filtered.push(inventory[arr]);
              }
        }
     }

    return (
        <>
            <div className="row  container">
                <div className="col-8 ">
                    <h1 className="text-center me-5 pe-5">shop section</h1>
                    {products.slice(0, 20).map((p) => (
                        <div className=" ">
                            <div
                                className="w-25 h-25 fw-bold"
                                style={{
                                    border: "2px solid green",
                                    margin: "10px",
                                    padding: "5px",
                                }}
                            >
                                <li>Name: {p.name}</li>
                                <p>ID: {p.id}</p>
                                <button className="btn btn-outline-warning" onClick={() => handleAddToCart(p)}>add to cart</button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="col-4  ">
                    <h1>cart section= {filtered.length}</h1>
                    {filtered.map((mp) => (
                        <div className="border fw-bold m-5 text-white bg-success">
                            <li>productId: {mp.product_id}</li>
                            <li>Price: {mp.unit_price}</li>
                            <li>quantity {mp.qty}</li>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
