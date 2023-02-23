import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { MyFirstControlComponent } from './my-first-control.component';

export default {
  /**
   * あっっれれれえｒ
   */
  title: 'MyFirstControlComponent',
  component: MyFirstControlComponent,
} as Meta<MyFirstControlComponent>;

const Template: Story<MyFirstControlComponent> = (args: MyFirstControlComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
