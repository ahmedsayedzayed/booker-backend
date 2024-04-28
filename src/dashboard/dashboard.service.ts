import { Inject, Injectable } from '@nestjs/common';
import { DashboardRepository } from './dashboard.repository';
import { CreateDashboardInput } from './dto/input/create-dashboard-input.dto';
import { DashboardDocument } from './models/dashboard.schema';
import { UpdateDashboardInput } from './dto/input/update-dashboard-input.dto';
import { GetDashboardArgs } from './dto/args/get-dashboards-args.dto';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from 'src/common/constants/injection-token';
import { DASHBOARD_UPDATED } from './constants/pubsub-trigger';

@Injectable()
export class DashboardService {
  constructor(
    private readonly dashboardRepository: DashboardRepository,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}
  async createDashboard(createDashboardData: CreateDashboardInput) {
    const dashboardDocument = await this.dashboardRepository.create({
      ...createDashboardData,
      Widgets: [],
    });
    return this.toModel(dashboardDocument);
  }

  async updateDashboard(updateDashboardData: UpdateDashboardInput) {
    const dashboardDocument = await this.dashboardRepository.findOneAndUpdate(
      { _id: updateDashboardData._id },
      updateDashboardData,
    );
    const dashboardPlan = this.toModel(dashboardDocument);
    this.pubSub.publish(DASHBOARD_UPDATED, {
      dashboardUpdated: { ...dashboardPlan },
    });
    return dashboardPlan;
  }

  async getDashboards() {
    const dashboardDocuments = await this.dashboardRepository.getAll();
    return dashboardDocuments.map((dashboard) => this.toModel(dashboard));
  }

  async getDashboard(getDashboardArgs: GetDashboardArgs) {
    const dashboardDocument = await this.dashboardRepository.findOne({
      ...getDashboardArgs,
    });
    return this.toModel(dashboardDocument);
  }

  private toModel(dashboardDocument: DashboardDocument) {
    return {
      _id: dashboardDocument._id.toHexString(),
      ...dashboardDocument,
    };
  }
}
