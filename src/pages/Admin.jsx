import CreateProduct from "../components/Products/CreateProduct.jsx"
import Users from "../components/admin/Users.jsx"
import Page from "../components/page.jsx"
import Products from "../components/admin/Products.jsx"
function Admin() {
  return (
    <>
    <Page title="Admin">
    <CreateProduct />
    <Users />
    <Products />
    </Page>
    

    </>
  )
}

export default Admin