import DynamicRating from './../components/DynamicRating/DynamicRating';

export default {
  title: 'Components/DynamicRating',
  component: DynamicRating,
  argTypes: {
    variant: {
      options: ["green","blue","lilac","pink","yellow"],
      control: { type: 'select' },
    },
    averageColor: {
      control: { type: 'color' },
    },
    benchmarkColor: {
      control: { type: 'color' },
    },
  }
};