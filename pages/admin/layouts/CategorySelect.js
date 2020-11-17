import { useState } from 'react';
import { Input } from 'reactstrap';

const CategorySelect = ({ setParentCategory, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState({ "nodeCode": "--" });
  const [childVisible, setChildVisible] = useState(false);
  const [selectedChild, setSelectedChild] = useState(({ "nodeCode": "--" }))
  const [selectedGrandChild, setSelectedGrandChild] = useState(({ "nodeCode": "--" }))
  const [categoryChildren, setCategoryChildren] = useState({ "nodeCode": "--" });
  const [grandchildVisible, setGrandChildVisible] = useState(false);
  const [categoryGrandchildren, setCategoryGrandchildren] = useState({ "nodeCode": "--" });

  const handleRootCategoryChange = e => {
    if (e.target.value != "") {
      let selectedCat;
      categories.forEach((cat) => {
        if (cat.nodeCode === e.target.value) {
          selectedCat = cat;
          return;
        }
      })
      setCategoryChildren(selectedCat.children);
      setChildVisible(true);
      setSelectedCategory(selectedCat);
      setParentCategory(selectedCat.nodeCode);
    }
  }

  const handleChildCategoryChange = e => {
    if (e.target.value != '') {
      if (e.target.value != "" && selectedCategory.children[e.target.value].children && Object.keys(selectedCategory.children[e.target.value].children).length > 0) {
        setCategoryGrandchildren(selectedCategory.children[e.target.value].children);
        setGrandChildVisible(true);
        setSelectedChild(selectedCategory.children[e.target.value]);
      }
      setSelectedChild(selectedCategory.children[e.target.value]);
      setParentCategory(selectedCategory.children[e.target.value].nodeCode);
    } else {
      setGrandChildVisible(false);
      setParentCategory(selectedCategory.nodeCode);
    }
  }

  const handleGrandChildCategoryChange = e => {
    console.log(e.target.value);
    if (e.target.value != '') {
      setSelectedGrandChild(selectedCategory.children[selectedChild.nodeCode].children[e.target.value]);
      setParentCategory(selectedCategory.children[selectedChild.nodeCode].children[e.target.value].nodeCode);
    } else {
      setParentCategory(selectedChild.nodeCode);
    }
  }

  return (
    <div>
      <label>Category*</label>
      <div className="form-group">
        <Input type="select" name="select" onChange={e => handleRootCategoryChange(e)} value={selectedCategory.nodeCode}>
          <option value="">--</option>
          {categories.map((category) => (
            <option key={category.nodeCode} value={category.nodeCode}>{category.title.value}</option>
          ))}

        </Input>
      </div>
      {
        childVisible && (
          <div className="form-group">
            <Input type="select" name="select" onChange={e => handleChildCategoryChange(e)} value={categoryChildren.nodeCode}>
              <option value="">--</option>
              {Object.keys(categoryChildren).map((key) => {
                let category = categoryChildren[key];
                if (key != "array") {
                  return (
                    <option key={category.nodeCode} value={category.nodeCode}>{category.title.value}</option>
                  )
                }
              })}

            </Input>
          </div>
        )
      }
      {grandchildVisible && (
        <div className="form-group">
          <Input type="select" name="select" onChange={e => handleGrandChildCategoryChange(e)} value={categoryGrandchildren.nodeCode}>
            <option value="">--</option>
            {Object.keys(categoryGrandchildren).map((key) => {
              let category = categoryGrandchildren[key];
              if (key != "array") {
                return (
                  <option key={category.nodeCode} value={category.nodeCode}>{category.title.value}</option>
                )
              }
            })}

          </Input>
        </div>
      )}
    </div>

  )
}

export default CategorySelect;