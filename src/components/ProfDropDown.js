import { useMemo, useState } from "react";  
import { DropDownList } from "@progress/kendo-react-dropdowns";  
  
import PropTypes from "prop-types";

export default function ProfDropDown({profs, setprof}) {
    // Store currently selected category  
    const [category, setCategory] = useState("");   

    const categories = profs.map(prof => prof.prof_name)
    console.log(categories)

    return (
        <section className="k-my-8">
          <form className="k-form k-mb-4">
            <label className="k-label k-mb-3">Professor</label>
            <DropDownList data={categories} onChange={e => setCategory(e.value)} />
          </form>
        </section>
      );
    };

ProfDropDown.propTypes = {
    courses: PropTypes.arrayOf(PropTypes.string)
}