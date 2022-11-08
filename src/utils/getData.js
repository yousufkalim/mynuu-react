/* eslint-disable operator-linebreak */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable no-return-await */
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore/lite';
import db from './firebase';

// Categorized all Products by their category
export const getCategorizedProducts = async (productCategories, allProducts) => {
  const finalData = [];
  productCategories.forEach((prod) => {
    const dataByCategory = allProducts?.filter((item) => item.categoryId === prod);
    const dataObj = {
      categoryId: prod,
      products: dataByCategory,
    };
    finalData.push(dataObj);
  });

  const data = await finalData?.map(async (item) => {
    const catRef = doc(db, 'categories', item.categoryId);
    const catDoc = await getDoc(catRef);

    const categoryData = await catDoc.data();
    return { ...item, categoryName: categoryData?.name };
  });

  return await Promise.all(data).then((res) => res);
};

// Get Restaurant by Id
export const getRestaurantById = async (restaurantId, setRestaurant) => {
  const docs = doc(db, 'restaurants', restaurantId);
  const restaurantDoc = await getDoc(docs);
  const data = restaurantDoc.data();
  setRestaurant(data);
};

export const getProducts = async (setLoading, setProducts) => {
  const docs = query(
    collection(db, 'products'),
    where('deleted', '==', false),
    where('enabled', '==', true),
    where('restaurantId', '==', 'UrFryd4KEYQsgh3DGViBvXqyIGP2'),
  );

  setLoading(true);
  const productDocs = await getDocs(docs);
  const allProducts = productDocs?.docs?.map((docum) => ({ id: docum.id, ...docum.data() }));
  if (allProducts?.length) {
    const allCategories = allProducts?.map((item) => item.categoryId);

    const uniqueCategories = [...new Set(allCategories)];

    const limitCategories = uniqueCategories?.filter((cat, index) => index < 5);

    const dataWithCategory = await getCategorizedProducts(limitCategories, allProducts);

    setProducts(dataWithCategory);
    setLoading(false);
  }
  setLoading(false);
};

export const getAllSubCategories = async (selectedMenu, setCategories) => {
  const docs = query(
    collection(db, 'categories'),
    where('restaurantId', '==', 'UrFryd4KEYQsgh3DGViBvXqyIGP2'),
  );
  const cats = await getDocs(docs);
  const data = cats?.docs?.map((docum) => ({ id: docum?.id, ...docum.data() }));
  setCategories(data);
};

export const getAllMenus = async (setMenus) => {
  const docs = query(
    collection(db, 'menus'),
    where('restaurantId', '==', 'UrFryd4KEYQsgh3DGViBvXqyIGP2'),
  );
  const menuDocs = await getDocs(docs);
  const data = menuDocs.docs?.map((docum) => ({ id: docum?.id, ...docum.data() }));
  setMenus(data);
};

export const getProductsByMenu = async (selectedMenu, setLoading, setProducts) => {
  setLoading(true);
  const productQuery = query(
    collection(db, 'products'),
    where('deleted', '==', false),
    where('enabled', '==', true),
    where('menuId', '==', selectedMenu?.id),
  );
  const productsData = await getDocs(productQuery);

  const allProducts = productsData?.docs?.map((docum) => ({ id: docum?.id, ...docum.data() }));
  if (allProducts?.length > 0) {
    const allCategories = allProducts?.map((item) => item.categoryId);
    const uniqueCategories = [...new Set(allCategories)];

    const dataWithCategory = await getCategorizedProducts(uniqueCategories, allProducts);
    setProducts(dataWithCategory);
    setLoading(false);
    return;
  }
  setProducts([]);
  setLoading(false);
};

export const getProductsByCategory = async (selectedCategory, setLoading, setProducts) => {
  setLoading(true);
  const productQuery = query(
    collection(db, 'products'),
    where('deleted', '==', false),
    where('enabled', '==', true),
    where('categoryId', '==', selectedCategory?.id),
  );
  const productsData = await getDocs(productQuery);
  const allProducts = productsData?.docs?.map((docum) => ({ id: docum?.id, ...docum.data() }));

  const data = [
    {
      categoryName: selectedCategory?.name,
      categoryId: selectedCategory?.id,
      products: allProducts,
    },
  ];
  setProducts(data);
  setLoading(false);
};

//    Searched Products
export const getSearchedProducts = async (searchTerm, setLoading, setProducts) => {
  if (searchTerm) {
    console.log('Searched Term ', searchTerm);
    const searchText = searchTerm.toLowerCase();
    // const productQuery = query(
    //   collection(db, 'products'),
    //   orderBy('keyword'),
    //   startAt(searchTerm),
    //   endAt(`${searchTerm}\uf8ff`),
    // );
    setLoading(true);
    const productQuery = query(
      collection(db, 'products'),
      where('deleted', '==', false),
      where('enabled', '==', true),
      where('restaurantId', '==', 'UrFryd4KEYQsgh3DGViBvXqyIGP2'),
      where('keyword', 'in', [searchText]),
    );
    const productsData = await getDocs(productQuery);
    const allProducts = productsData?.docs?.map((docum) => ({
      id: docum?.id,
      ...docum.data(),
    }));

    console.log('Find products ', allProducts);
    if (allProducts?.length > 0) {
      const allCategories = allProducts?.map((item) => item.categoryId);
      const uniqueCategories = [...new Set(allCategories)];

      const limitCategories = uniqueCategories?.filter((cat, index) => index < 5);

      const dataWithCategory = await getCategorizedProducts(limitCategories, allProducts);
      setProducts(dataWithCategory);
      setLoading(false);
      return;
    }
    setLoading(false);
    setProducts([]);
  } else {
    getProducts(setLoading, setProducts);
  }

  // setLoading(true);
  // const productDocs = await getDocs(dof);
  // const allProducts = productDocs?.docs?.map((docum) => ({ id: docum.id, ...docum.data() }));
  // if (allProducts?.length) {
  //   const allCategories = allProducts?.map((item) => item.categoryId);
  //   const uniqueCategories = [...new Set(allCategories)];

  //   const limitCategories = uniqueCategories?.filter((cat, index) => index < 5);

  //   const dataWithCategory = await getCategorizedProducts(limitCategories, allProducts);
  //   setProducts(dataWithCategory);
  //   setLoading(false);
  // }
  // setLoading(false);
};
