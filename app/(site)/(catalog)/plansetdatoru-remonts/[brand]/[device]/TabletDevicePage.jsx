import DeviceDetailPage from '@/_components/sections/device-detail/DeviceDetailPage';

export default function TabletDevicePage(props) {
  return (
    <DeviceDetailPage
      servicesId="tablet-services"
      faqId="tablet-model-faq"
      {...props}
    />
  );
}
