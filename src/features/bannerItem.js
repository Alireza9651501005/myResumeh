import FullBannerComponent from "./fullBanner/fullBannerComponent";
import CurveBanner from "./curveBanner/curveBanner";

const BannerItem = ({ items, full }) => {
    switch (full) {
        case true:
            return <FullBannerComponent items={items} />
            break;
        case false:
            return <CurveBanner items={items} />
            break;
        default:
            return null;
    }
}

export default BannerItem;