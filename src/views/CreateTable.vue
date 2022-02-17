<template>
  <NavCreateTable />
  <div class="row mycontent-top h-100">
    <div class="col-md-7 mycontent-left nopadding">
      <h1 class="mx-5 my-2 h5 fw-normal">Items</h1>
      <div class="mycontent-top table-area h-100">
        <div class="d-flex flex-column mx-5">
          <div class="form-group py-4 w-50">
            <input v-model="searchQuery" class="form-control" name="search" placeholder="search" required="" type="text" />
          </div>
          <table class="table table-bordered">
            <thead>
              <tr class="justify-content-around bg-light">
                <th>ITEM NAME &nbsp;<button class="fa fa-sort" type="button" @click="sort"></button></th>
                <th>ITEM CODE</th>
                <th>SELLING PRICE</th>
                <th>PURCHASE PRICE</th>
                <th>UNIT</th>
                <th>DATE</th>
              </tr>
            </thead>
            <tbody class="">
              <tr class="justify-content-around white" v-for="(item, index) in searchItems" :key="item.id" v-on:click="updateCell(index, item)">
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
      <h1 class="m-2 h5 fw-normal">Create/Edit Items</h1>
      <div class="mycontent-top">
        <form @submit.prevent="saveItem">
          <div class="d-flex p-2">
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
          <div class="d-flex p-2">
            <div class="form-group p-2 w-100">
              <label for="salesprice">Sales Price</label>
              <input v-model="data.selling_price" class="form-control" id="salesprice" type="number" placeholder="₹0" name="sellingPrice" />
            </div>
            <div class="form-group p-2 w-100">
              <label for="purchaseprice">Purchase Price</label>
              <input v-model="data.purchase_price" class="form-control" id="purchaseprice" placeholder="₹0" type="number" name="purchasePrice" />
            </div>
          </div>
          <div class="d-flex p-2">
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
          <div class="p-4">
            <button class="w-100 btn btn-lg btn-primary" type="submit">{{ saveUpdate }}</button>
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
    const saveUpdate = ref('Save');
    const indexUpdate = ref(0);
    const toggle = ref(true);
    const items = ref([{ itemName: '', itemCode: '', sellingPrice: '', purchasePrice: '', unit: '', date: '' }]);
    const data = reactive({
      item_name: '',
      item_code: '',
      selling_price: '',
      purchase_price: '',
      unit: '',
      date: ''
    });

    const saveItem = () => {
      if (saveUpdate.value == 'Save') {
        items.value.push({
          itemName: data.item_name,
          itemCode: data.item_code,
          sellingPrice: data.selling_price,
          purchasePrice: data.purchase_price,
          unit: data.unit,
          date: data.date
        });
      } else {
        items.value[indexUpdate.value] = {
          itemName: data.item_name,
          itemCode: data.item_code,
          sellingPrice: data.selling_price,
          purchasePrice: data.purchase_price,
          unit: data.unit,
          date: data.date
        };
        saveUpdate.value = 'Save';
      }
      localStorage.setItem('items', JSON.stringify(items.value));
    };

    const updateCell = (index: any, item: any) => {
      data.item_name = searchItems.value[index].itemName;
      data.item_code = searchItems.value[index].itemCode;
      data.selling_price = searchItems.value[index].sellingPrice;
      data.purchase_price = searchItems.value[index].purchasePrice;
      data.date = searchItems.value[index].date;
      saveUpdate.value = 'Update';
      indexUpdate.value = items.value.indexOf(item);
    };

    const sort = () => {
      toggle.value = !toggle.value;
    };
    const searchItems = computed(() => {
      return items.value
        .filter((item: any) => {
          return item.itemName.toLowerCase().indexOf(searchQuery.value.toLowerCase()) != -1 && item.itemName != '';
        })
        .sort((a: any, b: any) => {
          if (toggle.value) {
            return a.itemName.localeCompare(b.itemName);
          } else {
            return b.itemName.localeCompare(a.itemName);
          }
        });
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
      updateCell,
      saveUpdate,
      sort,
      items
    };
  }
};
</script>

<style>
#app {
  height: 100vh;
}
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
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
