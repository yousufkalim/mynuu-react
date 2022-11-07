/* eslint-disable object-curly-newline */
/* eslint-disable no-return-await */
import {
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  orderBy,
  query,
  startAt,
  where,
} from 'firebase/firestore/lite';
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

export const getProducts = async (setLoading, setProducts) => {
  // const docs =
  //   query(collection(db, 'products'), where('menuId', '==', 'UrFryd4KEYQsgh3DGViBvXqyIGP2'));

  const dof = collection(db, 'products');
  setLoading(true);
  const productDocs = await getDocs(dof);
  const allProducts = productDocs?.docs?.map((docum) => ({ id: docum.id, ...docum.data() }));
  if (allProducts?.length) {
    const allCategories = allProducts?.map((item) => item.categoryId);
    const uniqueCategories = [...new Set(allCategories)];

    const limitCategories = uniqueCategories?.filter((cat, index) => index < 5);

    const dataWithCategory = await getCategorizedProducts(limitCategories, allProducts);
    // const all = data?.map(async (item) => {
    //   const t = doc(db, 'categories', item.categoryId);
    //   const cat = await getDocs(t);
    //   console.log('TYPEEE ', cat);
    //   return { ...item, category: cat };
    // });
    setProducts(dataWithCategory);
    setLoading(false);
  }
  setLoading(false);
};

export const getAllSubCategories = async (setCategories) => {
  const cats = await getDocs(collection(db, 'categories'));
  const data = cats?.docs?.map((docum) => ({ id: docum?.id, ...docum.data() }));
  setCategories(data);
};

export const getAllMenus = async (setMenus) => {
  const menuDocs = await getDocs(collection(db, 'menus'));
  const data = menuDocs.docs?.map((docum) => ({ id: docum?.id, ...docum.data() }));
  setMenus(data);
};

export const getProductsByMenu = async (selectedMenu, setLoading, setProducts) => {
  setLoading(true);
  const productQuery = query(collection(db, 'products'), where('menuId', '==', selectedMenu?.id));
  const productsData = await getDocs(productQuery);

  const allProducts = productsData?.docs?.map((docum) => ({ id: docum?.id, ...docum.data() }));
  console.log('Products by menu => ', allProducts);
  if (allProducts?.length > 0) {
    const allCategories = allProducts?.map((item) => item.categoryId);
    const uniqueCategories = [...new Set(allCategories)];

    const dataWithCategory = await getCategorizedProducts(uniqueCategories, allProducts);
    console.log('Products by menu contains => ', dataWithCategory);
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
export const getSearchedProducts = async (searchTerm) => {
  console.log('Searched Term ', searchTerm);
  const productQuery = query(
    collection(db, 'products'),
    orderBy('keyword'),
    startAt(searchTerm),
    endAt(`${searchTerm}\uf8ff`),
  );
  console.log('Searched Query ', productQuery);
  const productsData = await getDocs(productQuery);
  console.log('Searched Docs ', productsData);
  const allProducts = productsData?.docs?.map((docum) => ({ id: docum?.id, ...docum.data() }));
  console.log('Searched Products ==> ', allProducts);
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
