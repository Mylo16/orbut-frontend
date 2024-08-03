import { Link } from "react-router-dom";
import images from "../../utils/images";
import CampaignForm from "../campaignForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCampaigns } from "../../redux/campaignSlice";
import LoadingBar from "../loadingBar";
import UpdateCampaign from "../campaignUpdate";
import { userSignout } from "../../redux/userSlice";

export default function CampaignPage() {
  const dispatch = useDispatch();
  const [campaignClicked, setCampaignClicked] = useState(false);
  const [editClicked, setEditClicked] = useState(false);
  const { campaigns } = useSelector(store => store.campaign);
  const [campaignData, setCampaignData] = useState({
    name: '',
    description: '',
    banner_url: '',
    id: '',
  });

  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);

  const handleNewCampaign = () => {
    setCampaignClicked(!campaignClicked);
  };

  const handleUpdate = () => {
    setEditClicked(!editClicked);
  }

  const handleUpdateCampaign = (id, name,  banner_url, description,) => {
    setCampaignData({
      ...campaignData,
      name,
      description,
      banner_url,
      id
    });
    handleUpdate();
  }

  const handleSignout = () => {
    dispatch(userSignout());
  };

  return (
    <>
      { campaignClicked && <CampaignForm campaignClicked={handleNewCampaign} /> }
      { editClicked && <UpdateCampaign editClicked={handleUpdate} campaignData={campaignData} /> }
      <div className="campaign-body-container">
        <div className="campaign-body">
          <div className="right-row1">
            <p className="campaign-txt">Campaign</p>
            <div className="right-row1-col2">
              <a href="#" onClick={handleSignout}>Sign out</a>
              <div className="notification-container">
                <img className="notification-icon" src={images.notification} alt="notification" />
              </div>
              <div className="user-profile">
                <img className="user-pic" src={images.userProfile} alt="user-profile" />
                <p>user name</p>
              </div>
            </div>
          </div>
          <div className="right-row2">
            <h2 className="total-revenue">Your Total Revenue</h2>
            <div className="right-row1-2">
              <h1 className="amount">GHC 6,987,980</h1>
              <div className="right-row1-2-col2">
                <div className="sort-1">
                  <img className="filter" src={images.filter} alt="sort-by-date"/>
                  <p>Select dates</p>
                </div>
                <div className="sort-2">
                  <img className="filter" src={images.filter} alt="filter"/>
                  <p>Filter</p>
                </div>
              </div>
            </div>
          </div>
          <div className="metrics">
            <div className="metrics-col">
              <p className="metric-titles">New Subscriptions</p>
              <div>
                <p className="metric-value">875</p>
                <div className="metric-analysis">
                  <img className="increase" src={images.increase} alt="increased"/>
                  <p className="percent-increase">24%</p>
                </div>
              </div>
              <p className="compare">Compare to last week</p>
            </div>
            <div className="metrics-col">
              <p className="metric-titles">New Orders</p>
              <div>
                <p className="metric-value">500</p>
                <div className="metric-analysis">
                  <img className="decrease" src={images.decrease} alt="decreased"/>
                  <p className="percent-decrease">17%</p>
                </div>
              </div>
              <p className="compare">Compare to last week</p>
            </div>
            <div className="metrics-col">
              <p className="metric-titles">Average Revenue</p>
              <div>
                <p className="metric-value">GHC8,673</p>
                <div className="metric-analysis">
                  <img className="increase" src={images.increase} alt="increased"/>
                  <p className="percent-increase">24%</p>
                </div>
              </div>
              <p className="compare">Compare to last week</p>
            </div>
          </div>
          <div className="recents">
            <p>Recent Campaigns</p>
            <a href="#">View all</a>
          </div>
          <div className="campaigns-container">
            <div className="col">
              <div className="draft">
                <p>Draft</p>
                <p className="recent-count">1</p>
              </div>
              {campaigns && campaigns.data ? 
                <div className="campaign-box">
                  <div className="campaign-box-row1">
                    <div className="reactors">
                      <img className="reactor" src={images.pic1} />
                      <img className="reactor" src={images.pic2} />
                      <img className="reactor" src={images.pic1} />
                      <img className="reactor" src={images.pic2} />
                    </div>
                    <a 
                    onClick={() => handleUpdateCampaign(
                      campaigns.data[2].id,
                      campaigns.data[2].name,
                      campaigns.data[2].banner_url,
                      campaigns.data[2].description)} href="#">
                        Edit
                    </a>
                  </div>
                  <p>{campaigns.data[2].description}</p>
                  <p className="status">Status: Not Started</p>
                  <p className="status">Last Updated: April 10, 2024</p>
                </div>
              : <LoadingBar />
              }
              <div onClick={handleNewCampaign} className="new-campaign">
                <img className="add" src={images.add} alt="add"/>
                <p>Add Campaign</p>
              </div>
            </div>
            <div className="col">
              <div className="progress">
                <p>In Progress</p>
                <p className="recent-count">1</p>
              </div>
              {campaigns && campaigns.data ? 
                <div className="campaign-box">
                  <div className="campaign-box-row1">
                    <div className="reactors">
                      <img className="reactor" src={images.pic1} />
                      <img className="reactor" src={images.pic2} />
                      <img className="reactor" src={images.pic1} />
                      <img className="reactor" src={images.pic2} />
                    </div>
                    <a href="#">Edit</a>
                  </div>
                  <p>{campaigns.data[2].description}</p>
                  <p className="status">Status: In Progress</p>
                  <p className="status">Last Updated: April 10, 2024</p>
                </div>
              : <LoadingBar />
              }
            </div>
            <div className="col">
              <div className="complete">
                <p>Complete</p>
                <p className="recent-count">2</p>
              </div>
              {campaigns && campaigns.data ? 
                <div className="campaign-box">
                  <div className="campaign-box-row1">
                    <div className="reactors">
                      <img className="reactor" src={images.pic1} />
                      <img className="reactor" src={images.pic2} />
                      <img className="reactor" src={images.pic1} />
                      <img className="reactor" src={images.pic2} />
                    </div>
                    <a href="#">Edit</a>
                  </div>
                  <p>{campaigns.data[2].description}</p>
                  <p className="status">Status: Completed</p>
                  <p className="status">Last Updated: April 10, 2024</p>
                </div>
              : <LoadingBar />
              }
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
