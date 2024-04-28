import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Dashboard } from './models/dashboard.model';
import { DashboardService } from './dashboard.service';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateDashboardInput } from './dto/input/create-dashboard-input.dto';
import { UpdateDashboardInput } from './dto/input/update-dashboard-input.dto';
import { GetDashboardArgs } from './dto/args/get-dashboards-args.dto';
import { PUB_SUB } from 'src/common/constants/injection-token';
import { PubSub } from 'graphql-subscriptions';
import { DASHBOARD_UPDATED } from './constants/pubsub-trigger';

@Resolver(() => Dashboard)
export class DashboardResolver {
  constructor(
    private readonly dashboardService: DashboardService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  //   @UseGuards(GqlAuthGuard)
  @Mutation(() => Dashboard)
  async createDashboard(
    @Args('createDashboardData') createDashboardData: CreateDashboardInput,
  ) {
    return this.dashboardService.createDashboard(createDashboardData);
  }

  //   @UseGuards(GqlAuthGuard)
  @Mutation(() => Dashboard)
  async updateDashboard(
    @Args('updateDashboardData') updateDashboardData: UpdateDashboardInput,
  ) {
    return this.dashboardService.updateDashboard(updateDashboardData);
  }

  //   @UseGuards(GqlAuthGuard)
  @Query(() => [Dashboard], { name: 'dashboards' })
  async getDashboard() {
    return this.dashboardService.getDashboards();
  }

  //   @UseGuards(GqlAuthGuard)
  @Query(() => Dashboard, { name: 'dashboard' })
  async getBookmark(@Args() getBookmarkArgs: GetDashboardArgs) {
    return this.dashboardService.getDashboard(getBookmarkArgs);
  }

  @Subscription(() => Dashboard)
  dashboardUpdated() {
    return this.pubSub.asyncIterator(DASHBOARD_UPDATED);
  }
}
