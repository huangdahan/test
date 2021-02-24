import Vue from 'vue';
// import 'element-ui/lib/theme-chalk/index.css';
import {
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Button,
  Tree,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Message,
  MessageBox,
  Dialog,
  Radio,
  RadioGroup,
  Menu,
  MenuItem,
  Submenu
} from 'element-ui';

Vue.prototype.$msg = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;

const arr = [
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Button,
  Tree,
  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Dialog,
  Radio,
  RadioGroup,
  Menu,
  MenuItem,
  Submenu
];

for (let i = 0; i < arr.length; i++) {
  Vue.use(arr[i]);
}
