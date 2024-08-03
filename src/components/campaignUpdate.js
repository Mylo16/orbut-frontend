import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCampaign } from "../redux/campaignSlice";
import images from "../utils/images";

export default function UpdateCampaign({ editClicked, campaignData }) {
  const [campaignUpdateData, setCampaignUpdateData] = useState({
    name: campaignData.name || '',
    start_date: '',
    end_date: '',
    description: campaignData.description || '',
    banner_url: campaignData.banner_url || '',
    status: '',
  });
  const dispatch = useDispatch();
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');
  const { error } = useSelector((store) => store.campaign);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCampaign({ campaignData: campaignUpdateData, campaignId: campaignData.id }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let dateTimeValue;
    if (name === 'start_date' || name === 'end_date') {
      const currentDate = new Date(value);
      const isoString = currentDate.toISOString(); // Convert date to ISO string format
      dateTimeValue = isoString;

      if (name === 'start_date') {
        setDate1(value);
      } else if (name === 'end_date') {
        setDate2(value);
      }
    } else {
      dateTimeValue = value;
    }

    setCampaignUpdateData({
      ...campaignUpdateData,
      [name]: dateTimeValue,
    });
  };

  const handleFormClose = () => {
    editClicked();
  };

  useEffect(() => {
    if (error === false) {
      handleFormClose();
      window.location.reload();
    }
  }, [error]);

  return (
    <>
      <div className="form-overlay">
        <form className="campaign-form" onSubmit={handleFormSubmit}>
          <div className="create-campaign-header">
            <p>Update Campaign</p>
            <img onClick={handleFormClose} src={images.close} className="close-button" alt="close" />
          </div>
          <p className="new-cpn-instruction">Update the campaign by filling in the necessary details</p>
          <input value={campaignUpdateData.name} placeholder="Campaign name" name="name" onChange={handleInputChange} type="text" required className="campaign-input" />
          <textarea value={campaignUpdateData.description} placeholder="Description" name="description" onChange={handleInputChange} required className="description-input" />
          <div className="dates">
            <input required type="date" name="start_date" className={`date-input ${!date1 ? 'empty' : ''}`} value={date1} onChange={handleInputChange} />
            {!date1 && <span className="date-placeholder">Enter start date</span>}
            <input required type="date" name="end_date" className={`date-input ${!date2 ? 'empty' : ''}`} value={date2} onChange={handleInputChange} />
            {!date2 && <span className="date-placeholder2">Enter end date</span>}
          </div>
          <input value={campaignUpdateData.banner_url} placeholder="Banner URL" name="banner_url" className="campaign-input" type="text" onChange={handleInputChange} />
          <select name="status" onChange={handleInputChange} type="text" required className="select">
            <option>Select status</option>
            <option value="DRAFT">Draft</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <div className="buttons">
            <button className="cancel-btn" onClick={handleFormClose} type="button">Cancel</button>
            <input type="submit" value="Update Campaign" className="submit-campaign-btn" />
          </div>
        </form>
      </div>
    </>
  );
}
