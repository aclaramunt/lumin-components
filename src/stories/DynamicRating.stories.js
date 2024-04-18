import DynamicRating from './../components/DynamicRating/DynamicRating'

export default {
  title: 'Components/DynamicRating',
  component: DynamicRating,
  decorators: [
    (Story, context) => {
      let { theme } = context.globals

      if (theme == 'light') {
        return {
          template: '<div style="padding: 20px;"><story/></div>',
        }
      }

      return {
        template:
          '<div class="dark-theme" style="background-color: #030D18; padding: 20px;"><story/></div>',
      }
    },
  ],
  argTypes: {
    variant: {
      options: ['green', 'blue', 'lilac', 'pink', 'yellow'],
      control: { type: 'select' },
    },
    averageColor: {
      control: { type: 'color' },
    },
    benchmarkColor: {
      control: { type: 'color' },
    },
  },
}

export const Green = {
  args: {
    averageScore: 8.5,
    benchmarkScore: 6.5,
    variant: 'green',
  },
}
export const Blue = {
  args: {
    averageScore: 9,
    benchmarkScore: 6.1,
    variant: 'blue',
  },
}
export const Lilac = {
  args: {
    averageScore: 5.1,
    benchmarkScore: 62,
    variant: 'lilac',
  },
}
export const Pink = {
  args: {
    averageScore: 6,
    benchmarkScore: 6,
    variant: 'pink',
  },
}
export const Yellow = {
  args: {
    averageScore: 4,
    benchmarkScore: 6,
    variant: 'yellow',
  },
}
export const Custom = {
  args: {
    averageScore: 3,
    benchmarkScore: 6,
    averageColor: '#d2335b',
    benchmarkColor: '#45068d',
  },
}
