<template>
  <NavCreateTable />
  <div class="row mycontent-top">
    <div class="col-md-7 mycontent-left nopadding">
      <h1 class="mx-5 my-2 h4 fw-normal">Items</h1>
      <div class="mycontent-top table-area h-100">
        <div class="d-flex flex-column mx-5">
          <div class="form-group py-4 w-50">
            <input v-model="searchQuery" class="form-control" name="search" placeholder="search" required="" type="text" />
          </div>
          <table class="table table-bordered">
            <thead>
              <tr class="justify-content-around bg-light">
                <th>ITEM NAME</th>
                <th>ITEM CODE</th>
                <th>SELLING PRICE</th>
                <th>PURCHASE PRICE</th>
                <th>UNIT</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody class="">
              <tr class="justify-content-around white" v-for="item in searchItems" :key="item.id">
                <td>{{ item.itemName }}</td>
                <td>{{ item.itemCode }}</td>
                <td>₹ {{ item.sellingPrice }}</td>
                <td>₹ {{ item.purchasePrice }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-md-5 nopadding">
      <h1 class="m-2 h4 fw-normal">Create/Edit Items</h1>
      <div class="mycontent-top">
        <form @submit.prevent="saveItem">
          <div class="d-flex">
            <div class="form-group p-2 w-100">
              <label for="itemname">Item Name *</label>
              <input v-model="data.item_name" class="form-control" id="itemname" name="itemName" placeholder="Enter item name" required="" />
            </div>
            <div class="form-group p-2 w-100">
              <label for="itemcode">Item Code</label>
              <input v-model="data.item_code" class="form-control" id="itemcode" placeholder="Enter item code" name="itemCode" />
            </div>
          </div>
          <br />
          <h1 class="options h6 fw-normal bg-light">Stock &amp; Pricing details (Optional)</h1>
          <div class="d-flex">
            <div class="form-group p-2 w-100">
              <label for="salesprice">Sales Price</label>
              <input v-model="data.selling_price" class="form-control" id="salesprice" type="number" placeholder="₹0" name="sellingPrice" />
            </div>
            <div class="form-group p-2 w-100">
              <label for="purchaseprice">Purchase Price</label>
              <input v-model="data.purchase_price" class="form-control" id="purchaseprice" placeholder="₹0" type="number" name="purchasePrice" />
            </div>
          </div>
          <div class="d-flex">
            <div class="form-group p-2 w-100">
              <lable for="measuring">Measuring UNIT</lable>
              <select v-model="data.unit" class="form-select" id="measuring" name="units" placeholder="Select Unit">
                <option value="">Select Unit</option>
                <option value="pcs">pcs</option>
                <option value="boxes">boxes</option>
                <option value="gms">gms</option>
                <option value="kgs">kgs</option>
                <option value="ltr">ltr</option>
              </select>
            </div>
            <div class="form-group p-2 w-100">
              <lable for="openingdate">Opening Stock date</lable>
              <input v-model="data.date" class="form-control" id="openingdate" type="date" placeholder="Select date" name="date" />
            </div>
          </div>
          <div class="p-2">
            <button class="w-100 btn btn-lg btn-primary" type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import NavCreateTable from '../components/NavCreateTable.vue';

export default {
  name: 'CreateTable',
  components: { NavCreateTable: NavCreateTable },

  setup() {
    const searchQuery = ref('');
    const items = ref([
      { itemName: 'XYZ', itemCode: '36524', sellingPrice: '500', purchasePrice: '200', unit: '20', date: '12/07/21' },
      { itemName: 'Apple', itemCode: '36525', sellingPrice: '500', purchasePrice: '200', unit: '20', date: '12/07/21' },
      { itemName: 'Mango', itemCode: '36526', sellingPrice: '500', purchasePrice: '200', unit: '20', date: '12/07/21' },
      { itemName: 'Banana', itemCode: '36527', sellingPrice: '500', purchasePrice: '200', unit: '20', date: '12/07/21' }
    ]);
    const data = reactive({
      item_name: '',
      item_code: '',
      selling_price: '',
      purchase_price: '',
      unit: '',
      date: ''
    });

    const saveItem = () => {
      items.value.push({
        itemName: data.item_name,
        itemCode: data.item_code,
        sellingPrice: data.selling_price,
        purchasePrice: data.purchase_price,
        unit: data.unit,
        date: data.date
      });
      localStorage.setItem('items', JSON.stringify(items.value));
    };
    const searchItems = computed(() => {
      return items.value
        .filter((item) => {
          return item.itemName.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1;
        })
        .sort((a, b) => a.itemName.localeCompare(b.itemName));
    });
    onMounted(() => {
      if (localStorage.items) {
        items.value = JSON.parse(localStorage.getItem('items') || '[]');
      }
    });
    return {
      data,
      saveItem,
      searchItems,
      searchQuery,
      items
    };
  }
};
</script>

<style>
table,
thead,
tr {
  background-color: white;
  border: 2px solid #ededed;
  border-left: none;
  border-right: none;
  border-collapse: collapse;
}
td,
th {
  font-size: 12px;
  border: none;
}
th {
  font-weight: 500;
  color: grey;
}
.options {
  padding: 10px;
}
.mycontent-top {
  border-top: 2px solid #ededed;
}
.mycontent-left {
  border-right: 2px solid #ededed;
}
.table-area {
  background-color: #f7f2ff;
}
.nopadding {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
