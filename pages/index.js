import { EmptyState, Page, Layout, ResourcePicker } from '@shopify/polaris';
const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';
import store from 'store-js';
import ResourceListWithProducts from '../components/ResourcesList';

class Index extends React.Component {
    state = { open: false }

    render() {
        const emptyState = !store.get('ids');
        return (
            <Page
                primaryAction={{
                    content: 'Select Products',
                    onAction: () => this.setState({ open: true })
                }}
            >
                <ResourcePicker
                    resourceType="Product"
                    showVariants={false}
                    open={this.state.open}
                    onSelection={(resources) => this.handleSelection(resources)}
                    onCancel={() => this.setState({ open: false })}
                    idsFromResources
                />
                {emptyState ? (
                    <Layout>
                        <EmptyState
                            heading="Discount your product temporarily"
                            action={{
                                content: 'Select products',
                                onAction: () => this.setState({ open: true })
                            }}
                            image={img}
                        >
                            <p>Select Products to change state temporarily.</p>
                        </EmptyState>
                    </Layout>
                ) : (
                        <ResourceListWithProducts />
                    )}
            </Page>
        )
    }
    handleSelection = (resources) => {
        const idsFromResources = resources.selection.map((product) => {
            return product.id;
        });
        this.setState({ open: false })
        store.set('ids', idsFromResources);
    }
}

export default Index;
