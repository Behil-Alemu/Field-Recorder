import { useState } from 'react';


function useUpdateLists() {
  const [lists, setLists] = useState([]);
  const handleSampleDelete = async (id) => {
    try {
      let result = await handleDeleteClick(id);
      console.log(result);
      updateLists(id);
      return;
    } catch (err) {
      console.error(err);
    }
  };

  const updateLists = (deletedProjectId) => {
    setLists((prevProjects) => prevProjects.filter((project) => project.id !== deletedProjectId));
  };
  return [lists, handleSampleDelete ];
}
export default useUpdateLists;